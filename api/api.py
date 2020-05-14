from flask import make_response, request, Flask, redirect
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin
import re
import json
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["2/second","10/minute","50/hour","150/day"],
    
)
app.config['SECRET_KEY'] = 'super secret key'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['RATELIMIT_STRATEGY'] = 'fixed-window-elastic-expiry'
cors = CORS(app, resources={r"/login": {"origins": "http://192.168.1.44:3000/"}}, supports_credentials=True)




@app.route("/login", methods=['POST','GET'])
@cross_origin()
@limiter.limit("2/second","10/minute","50/hour","150/day")
def getData():


    if request.method == 'POST':
        userID = "x"
        userPW = "y"
        nameArr = []

        if request.get_json() != None:    
            data = request.get_json()
            userID = str(data["id"])
            userPW = str(data["pw"])        
            
            login_data = {
                'userid' :  userID,
                'pwd' : userPW,
                'Submit' : 'Sign In'
                }

            currentCourses = {} #ICINE KEYI

            with requests.Session() as s:
                url = 'https://kusis.ku.edu.tr/psp/ps/?cmd=login'
                r = s.post(url,data = login_data)
                newUrl = 'https://kusis.ku.edu.tr/psc/ps/EMP1LOYEE/SA/c/SA_LEARNER_SERVICES.SSS_MY_CRSEHIST.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ACADEMIC_RECORDS.HC_SSS_MY_CRSEHIST_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder&PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSS_MY_CRSEHIST.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSS_MY_CRSEHIST.GBL&PortalContentProvider=SA&PortalCRefLabel=My%20Course%20History&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes'
                a = s.get(newUrl)
                src = a.content
                soup = BeautifulSoup(src,features="html.parser")
                text = soup.get_text()    
                #text = open("file.txt","r").read()
                if len(re.findall("\.\.\.\n*.+\n*",text)) == 0 :
                    return {'name': "error",
                        'credits': "error",
                        'gpa': "error",
                        'currentCourses': "error"}
                nameArr = re.findall("[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü]+",re.findall("\.\.\.\n*.+\n*",text)[0])

                #GPAs : TÜM GPA'LER , lastGPA: en son GPA
                GPAs = re.findall("[0-4]\.[0-9]{3}",text)
                lastGPA = GPAs[len(GPAs)-1]
                lastSPA = GPAs[len(GPAs)-2]
                terms = re.findall("[0-9]{4}\s+([A-Z][a-z,ü]+\s?[0-9]{4})",text)
                lastTerm = terms[len(terms)-1]

                lectures = re.findall("[A-Z]{3,4}\s[0-9]{3}[A-Z]?\n+.+\n+.+\n+.*\n+.+\n+.+\n+",text)
                totalCredit = 0
                allCourses = {}
                currentGradedCourses = {}
                for item in lectures:
                    grades = re.findall("\\n[A-F,S][\+|\-]?\\n",item)
                    term = re.findall("[A-Z][a-z,ü]+\s?[0-9]{4}",item)[0]

                    if len(grades) != 0:
                        grade = grades[0]
                        grade = grade[1:len(grade)-1]
                        courseID = re.findall("[A-Z]{3,4}\s[0-9]{3}[A-Z]?",item)[0]
                        credits = re.findall("[0-9].00",item)[0]

                        if(beforeFall2019(term) and grade == "A+"):
                            grade = "A++"

                        if courseID in allCourses.keys():
                            if gradeToNumber(allCourses.get(courseID)[1]) <= gradeToNumber(grade):
                                if lastTerm != term:
                                    allCourses[courseID] = [credits,grade]
                                    totalCredit -= float(allCourses[courseID][0])
                                    totalCredit += float(credits)
                        else:
                            if lastTerm != term:
                                totalCredit += float(credits)
                                allCourses[courseID] = [credits,grade] 
                        
                        if lastTerm == term:
                            courseDetails = [0,0,"not taken"]
                            courseDetails[0] = credits
                            courseDetails[1] = grade
                            if courseID in allCourses.keys():
                                courseDetails[2] = allCourses[courseID][1]
                            if not (courseID in allCourses.keys()) or (courseID in allCourses.keys() and gradeToNumber(allCourses.get(courseID)[1]) <= gradeToNumber(grade)) :
                                currentGradedCourses[courseID] = courseDetails
                    elif re.findall("\\n(N|Y)",item)[0] == "Y":
                        courseID = re.findall("[A-Z]{3,4}\s[0-9]{3}[A-Z]?",item)[0]
                        currentCourses[courseID] = (re.findall("[0-9].00",item)[0])[0]
                

                fullName = ""
                for item in nameArr:
                    fullName += item + " "


                return {'name': fullName,
                        'credits': totalCredit,
                        'currentGradedCourses': currentGradedCourses,
                        'lastTerm': lastTerm,
                        'currentCourses': currentCourses,
                        'previousCourses': allCourses}

    else:
        return redirect("/login2", code=302)



def  gradeToNumber(str):

    if str == "A++":
        return 4.3;
    elif str ==  "A+":
        return 4
    elif str == "A":
        return 4;
    elif str == "A-":
        return 3.7;
    elif str == "B+":
        return 3.3;
    elif str == "B":
        return 3;
    elif str == "B-":
        return 2.7;
    elif str == "C+":
        return 2.3;
    elif str == "C":
        return 2;
    elif str == "C-":
        return 1.7;
    elif str == "D+":
        return 1.3;
    elif str == "D":
        return 1;
    elif str == "S":
        return 0.000000001;
    else: 
        return 0;
    
def beforeFall2019(str):

    if("2020" in str or "2021" in str or "2022" in str or "2023" in str or "2024" in str or "2025" in str):
        return False

    if(str == "Güz 2019" or str == "Fall 2019"):
        return False

    return True
  




