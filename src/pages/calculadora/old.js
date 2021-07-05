import './index.css'

function Calculadora() {

    const baseURL = "http://localhost:5000/calcular"

    return (

        <div>

        
            <div className='conteiner-01' >

                <form class="inputs" action="/calcular" method="POST">
                    <input class="inp" type="number" name="sal" step=".01" placeholder="Salario" required />
                    <input class="inp" type="number" name="dep" step=".01" placeholder="Número de dependentes" required />
                    <input class="inp" type="number" name="desconto" step=".01" placeholder="Desconto" required />
                    <button class="calc" type="submit">CALCULAR</button>
                </form>

            </div>


            <div class="results">
                <table>
                    <tr class="table1">
                        <th>SALARIO BRUTO</th>
                        <th>INSS</th>
                        <th>IRPF</th>
                        <th>DESCONTOS</th>
                        <th>TOTAL</th>
                        <th>RESULTADO</th>
                    </tr>
                </table>

                {/* <table>
                            <tr class="table2">
                                <th>{{ r }} {{ sal }}</th>
                                <th>{{ r }} {{ valorINSS }}</th>
                                <th>{{ r }} {{ valorIRRF }}</th>
                                <th>{{ r }} {{ desconto }}</th>
                                <th>{{ r }} {{ descontoTotal }} {{ parA }}{{ descontoPorcem }}{{ pc }}{{ parF }}</th>
                                <th>{{ r }} {{ salarioLiq }}</th>
                            </tr>
                </table> */}

            </div>
            <a class="newcalc" href="http://127.0.0.1:5000">LIMPAR</a>


        </div>

    );

}; export default Calculadora;