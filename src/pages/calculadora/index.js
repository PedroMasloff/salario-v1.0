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
            const res = await api.post('/calcular', input)
            console.log('apiRes', res);
            setData(res.data)
        } catch (error) {

        }


    }


    return (

        <div className="body">
            <div className="header">
                <img src="images/arcom-logo.png" />
                {/* <a className="title">CALCULADORA DE SALÁRIO </a> */}
                <img src="images/isacare-logo.png" />

            </div>
            <div className="page">

                <div className="left">
                   <div className="header-title"> <h1>Calculadora de salário líquido</h1>
                    <h2>Para realizar o cálculo do seu salário líquido, preencha os dados ao abaixo e clique em calcular.</h2></div>
                    <div className="inputform">
                        <form className="inputs" onSubmit={handleCalcular} autoComplete="off">
                            <label>Salário bruto:</label>
                            <input required className="inp" type="number" name="sal" step=".01 " pattern="R$ \d,\d{2}" data-mask="R$ 00,00" />
                            <label>Número de dependentes: </label>
                            <input required className="inp" type="number" name="dep" step=".01" />
                            <label>Outros descontos:</label>
                            <input required className="inp" type="number" name="desconto" step=".01" />
                            <button className="calc" type="submit">CALCULAR</button>
                        </form>
                    </div>
                </div>
                <div className="inputform right">
                    <div className="inputs">
                    <label>Salário bruto:</label>
                            <input disabled className="inp" value={data.sal ?"R$ " + data.sal : '-'}/>
                            <label>INSS: </label>
                            <input disabled className="inp" value={data.valorINSS ?"R$ " + data.valorINSS : '-'}/>
                            <label>IRPF:</label>
                            <input disabled className="inp" value={data.valorIRRF ?"R$ " + data.valorIRRF : '-'}/>
                            <label>DESCONTOS:</label>
                            <input disabled className="inp" value={data.desconto ?"R$ " + data.desconto : '-'}/>
                            <strong><label>TOTAL:</label></strong>
                            <input disabled className="inp" value={data.descontoTotal && data.descontoPorcem ?"R$ " + `${data.descontoTotal} (${data.descontoPorcem}%)` : '-'}/>
                        <strong><label>RESULTADOS:</label></strong> 
                            <input disabled className="inp" value={data.salarioLiq ?"R$ " + data.salarioLiq : '-'}/>
                            <button className="calc" onClick={() => setData({})}>LIMPAR</button>
                    </div>
                        

                </div>


                {/* <form className="inputs" onSubmit={handleCalcular}>
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
                <a className="newcalc" type="button" onClick={() => setData({})}>LIMPAR</a> */}
            </div>
            {/* <div>
                <img widht="140" height="100" src="http://www.arcom.com.br/wp-content/themes/wp-arcom/assets/images/marcas/isacare.png"/>
            </div> */}
        </div>
    )
}; export default Calculadora;