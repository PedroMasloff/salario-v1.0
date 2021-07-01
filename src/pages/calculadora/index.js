import React from 'react';
import './index.css'

import api from '../../services/api'


function Calculadora() {

    const [data, setData] = React.useState({
        // inicialização
        // sal: 2,
        // valorINSS: 2,
        // valorIRRF: 2,
        // desconto: 2,
        // descontoTotal: 2,
        // descontoPorcem: 2, 
        // salarioLiq: 2

    });

    async function handleCalcular(e) {
        e.preventDefault();

        const { sal, dep, desconto } = e.target;   
        console.log(sal.value)
        const input = {
            sal: sal.value,
            dep: dep.value,
            desconto: desconto.value,
        }

        console.log('formInput', input);

        try {
            const res =  await api.post('/calcular', input)
            console.log('apiRes', res);
            setData (res.data)
        } catch (error) {
            
        }
        
        
    }

   
    return (

        <div className="body">
            <div className="header">
                <a className="title">CALCULADORA DE SALÁRIO DO MENGÃO</a>
            </div>
            <div className="page">
                <form className="inputs" onSubmit={handleCalcular}>
                    <input required className="inp" type="number" name="sal" step=".01" placeholder="Salario"  />
                    <input required className="inp" type="number" name="dep" step=".01" placeholder="Número de dependentes"  />
                    <input required className="inp" type="number" name="desconto" step=".01" placeholder="Desconto"  />
                    <button className="calc" type="submit">CALCULAR</button>
                </form>
                <div className="results">
                    <table>
                        <tbody>
                            <tr className="table1">
                                <th>SALARIO BRUTO</th>
                                <th>INSS</th>
                                <th>IRPF</th>
                                <th>DESCONTOS</th>
                                <th>TOTAL</th>
                                <th>RESULTADO</th>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr className="table2">
                                <th>R$ {data.sal ? data.sal : '-'}</th>
                                <th>R$ {data.valorINSS ? data.valorINSS : '-'}</th>
                                <th>R$ {data.valorIRRF ? data.valorIRRF : '-'}</th>
                                <th>R$ {data.desconto ? data.desconto : '-'}</th>
                                <th>R$ {data.descontoTotal && data.descontoPorcem ? `${data.descontoTotal} (${data.descontoPorcem}%)` : '-'}</th>
                                <th>R$ {data.salarioLiq ? data.salarioLiq : '-'}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <a className="newcalc" type="button" onClick={() => setData({})}>LIMPAR</a>
            </div>
            
        </div>
    )
}; export default Calculadora;