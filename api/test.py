"""
GPA =   [0-4]\.[0-9]{3}  (TÜM GPALER)

KİŞİ İSMİ = \.\.\.\n*.+\n*   (Başta 3 nokta var, onları sil)

DERSLER (ISIM + DESCRIPTION + TERM + GRADE + CREDIT ) =  [A-Z]{3,4}\s[0-9]{3}[A-Z]?\n+.+\n+.+\n+.*\n+.+\n+.+\n+

HARF NOTLARI =  \\n[A-F][\+|\-]?\\n (BAŞINDA \n sonunda)

KREDILER = [0-9].00

DERS APPROVE = \\n(N|Y) (BAŞINDA \n var)


"""

