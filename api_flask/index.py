from datetime import time
import sqlite3
from flask import Flask, render_template, request, flash, json, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

banco = sqlite3.connect('salario.db')
cursor = banco.cursor()

salFax1 = cursor.execute('select FAIXA_FIN from INSS where ID = 1').fetchone()[0]
salFax2 = cursor.execute('select FAIXA_FIN from INSS where ID = 2').fetchone()[0]
salFax3 = cursor.execute('select FAIXA_FIN from INSS where ID = 3').fetchone()[0]
salFax4 = cursor.execute('select FAIXA_FIN from INSS where ID = 4').fetchone()[0]    
ali1 = cursor.execute('select ALIQUOTA from INSS where ID = 1').fetchone()[0]
ali2 = cursor.execute('select ALIQUOTA from INSS where ID = 2').fetchone()[0]
ali3 = cursor.execute('select ALIQUOTA from INSS where ID = 3').fetchone()[0]
ali4 = cursor.execute('select ALIQUOTA from INSS where ID = 4').fetchone()[0]
ali5 = cursor.execute('select ALIQUOTA from INSS where ID = 5').fetchone()[0]
ded1 = cursor.execute('select DEDUÇAO from INSS where ID = 1').fetchone()[0]
ded2 = cursor.execute('select DEDUÇAO from INSS where ID = 2').fetchone()[0]
ded3 = cursor.execute('select DEDUÇAO from INSS where ID = 3').fetchone()[0]
ded4 = cursor.execute('select DEDUÇAO from INSS where ID = 4').fetchone()[0]
ded5 = cursor.execute('select DEDUÇAO from INSS where ID = 5').fetchone()[0]

irrfFax1 = cursor.execute('select FAIXA_FIN from IRRF where ID = 1').fetchone()[0]
irrfFax2 = cursor.execute('select FAIXA_FIN from IRRF where ID = 2').fetchone()[0]
irrfFax3 = cursor.execute('select FAIXA_FIN from IRRF where ID = 3').fetchone()[0]
irrfFax4 = cursor.execute('select FAIXA_FIN from IRRF where ID = 4').fetchone()[0]
_ali2 = cursor.execute('select ALIQUOTA from IRRF where ID = 2').fetchone()[0]
_ali3 = cursor.execute('select ALIQUOTA from IRRF where ID = 3').fetchone()[0]
_ali4 = cursor.execute('select ALIQUOTA from IRRF where ID = 4').fetchone()[0]
_ali5 = cursor.execute('select ALIQUOTA from IRRF where ID = 5').fetchone()[0]
_ded2 = cursor.execute('select DEDUÇAO from IRRF where ID = 2').fetchone()[0]
_ded3 = cursor.execute('select DEDUÇAO from IRRF where ID = 3').fetchone()[0]
_ded4 = cursor.execute('select DEDUÇAO from IRRF where ID = 4').fetchone()[0]
_ded5 = cursor.execute('select DEDUÇAO from IRRF where ID = 5').fetchone()[0]

def calculaINSS(sal):
    #Faixas salariais

    print("Sal=",sal," salFax1=",salFax1)

    if (sal <= salFax1):
        ali = sal * ali1
        ded = ded1
        descontoINSS = ali - ded      

    elif (sal > salFax1) and (sal <= salFax2):
        ali = sal* ali2
        ded = ded2
        descontoINSS = ali - ded
    
    elif (sal > salFax2) and (sal <= salFax3):
        ali = sal * ali3
        ded = ded3
        descontoINSS = ali - ded
       
    elif (sal > salFax3) and (sal <= salFax4):
        ali = sal * ali4
        ded = ded4
        descontoINSS = ali - ded             
    else:
        ali = ali5
        ded = ded5
        descontoINSS = ded 
    return descontoINSS

#calculaIRRF executa o cálculo do IRRF 
def calculaIRRF(sal,dep,descontoINSS):
    
    salarioBase = sal - descontoINSS - (dep * 189.59)

    
    if (salarioBase <= irrfFax1):
        descontoIRRF = 0
    elif (salarioBase > irrfFax1) and (salarioBase <= irrfFax2):
        descontoIRRF = salarioBase * _ali2 - _ded2    
    elif (salarioBase > irrfFax2) and (salarioBase <= irrfFax3):
        descontoIRRF = salarioBase * _ali3 - _ded3  
    elif (salarioBase > irrfFax3) and (salarioBase <= irrfFax4):
        descontoIRRF = salarioBase * _ali4 -  _ded4       
    elif (salarioBase > irrfFax4):
        descontoIRRF = salarioBase * _ali5 - _ded5    

    return descontoIRRF

@app.route('/', methods=['GET','POST'])
def main():  
    return render_template('index.html')

@app.route('/calcular', methods=['GET','POST'])
def calcular():
    if request.method == "POST":
        sal1 = float(request.json["sal"])
        dep = int(request.json["dep"])
        desconto = float(request.json["desconto"])

        print("salario=",sal1," dependetes=",dep)

        valorINSS = calculaINSS(sal1) 
        valorIRRF = calculaIRRF(sal1, dep, valorINSS)
        salarioLiq = sal1 - (valorINSS + valorIRRF + desconto)
        descontoTotal =(valorIRRF + valorINSS + desconto)
        descontoPorcem = (descontoTotal * 100 / sal1)
        r = 'R$'
        pc = '%'
        parA = '('
        parF = ')'
        sal = format(sal1, '.2f')
        valorINSS = format(valorINSS, '.2f')
        valorIRRF = format(valorIRRF, '.2f')
        desconto = format(desconto, '.2f')
        descontoTotal = format(descontoTotal, '.2f')
        descontoPorcem = format(descontoPorcem, '.2f')
        salarioLiq = format(salarioLiq, '.2f')
    return {
        "sal": sal, 
        "valorINSS": valorINSS,
        "valorIRRF": valorIRRF,
        "desconto": desconto,
        "descontoTotal": descontoTotal, 
        "descontoPorcem": descontoPorcem,
        "salarioLiq": salarioLiq

        


    }



if __name__ == '__main__':
    app.run(debug = True)

