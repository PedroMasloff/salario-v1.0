import { useState } from "react";

function Tmp() {

    const baseURL = 'http://localhost:5000/calcular'


    const [calculadora, setcalculadora] = useState({ sal: '', dep: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setcalculadora({ ...calculadora, [name]: value })
    }

    async function Cadastrar(calculadora) {
        // const response = await
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(calculadora)
        });
    }

    return (

        <div>

            <form onSubmit={(event) => {

                event.preventDefault();
                Cadastrar(calculadora)
                setcalculadora({ sal: '', dep: '' })
                alert("cadastro ok ")

            }}>

                <input
                    className='form-dados-cadastro-1'
                    name='sal'
                    type='text'
                    value={calculadora.sal}
                    onChange={handleInputChange}
                    placeholder="salario:"
                />

                <input
                    className='form-dados-cadastro-1'
                    name='dep'
                    type='text'
                    value={calculadora.dep}
                    onChange={handleInputChange}
                    placeholder="digite seu salario :"
                />

                <input
                    className='form-dados-cadastro-1'
                    name='dep'
                    type='text'
                    value={calculadora.dep}
                    onChange={handleInputChange}
                    placeholder="digite seu salario :"
                />

                <button className='button-cadastra'> Cadastrar </button>

            </form>


        
            <div>
                
            </div>
        </div>

    );
} export default Tmp;




