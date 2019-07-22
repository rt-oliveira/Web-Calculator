const calculadora = {
    elemento_visor: null,
    numero: "",
    resultado: 0,
    op: "",
    modo: 1,
    /* "Modo" significa:
        0- Está em modo de erro. Só o botão 'Limpar' faz sair deste modo;
        1- Está digitando o primeiro número da conta;
        2- Está digitando o segundo número da conta, ou então outros operando da conta,
        caso ela tenha mais de 2 parcelas, como por exemplo: 5*8-4;
        3- Em modo de mostrar o resultado da conta.
    */
    inicializar: function(visor){
        // Apenas para guardar a referência ao visor da calculadora.
        this.elemento_visor=visor;
        visor.value='';
    },
    mostrar: function(){
        // Mostra o número na calculadora, NaN caso a conta tenha dado erro.
        if(this.modo===3 || this.modo===0)
            // Se fez a conta corretamente ou deu erro, mostra o 'resultado'.
            this.elemento_visor.value=this.resultado;
        else
            // Se ainda está digitando uma parcela da conta que quer fazer.
            this.elemento_visor.value=this.numero;
    },
    digitarOperando(caractere){
        /* Função que apenas recupera os números e pontos digitados dos operandos nas contas
        / Este primeiro caso acontece quando estou digitando a primeira ou a segunda parcela
          da conta. */  
        if(this.modo<= 2 && this.modo>0){
            if(caractere==='.'){
                if(this.numero.indexOf('.') === -1)
                    this.numero+=caractere;
            }else
                this.numero+=caractere;
        }
        /* Este caso acontece quando foi feita uma conta qualquer,
        porém ainda continuará a calcular. Exemplo de caso em que isso acontece:
        ao digitar 8 na conta 7+9-8. */
        else if(this.modo===3 && this.op!==""){
            this.modo=2;
            if(caractere==='.'){
                if(this.numero.indexOf('.') === -1)
                    this.numero+=caractere;
            }else
                this.numero+=caractere;
        }
        // Ao final é mostrado o operando no visor, com este novo dígito.
        this.mostrar();
    },
    voltar: function(){
        // Este método remove o último caractere (dígito ou ponto) digitado.
        // Funciona somente quando se está digitando alguma parcela da conta.
        if(this.modo <= 2)
            if(this.numero.length!==0)
                this.numero=this.numero.substring(0,this.numero.length-1);
        this.mostrar();
    },
    digitarOperador: function(operador){
        // Método que é acionado quando um operado é apertado (+,-,*,/).
        if(this.modo===1){
            // Neste primeiro caso, o primeiro número da conta é interpretado como número
            // e posteriormente já é colocado em 'resultado' para a futura conta.
            this.op=operador;
            this.resultado=Number.parseFloat(this.numero);
            this.numero="";
            this.modo=2;
        }
        else if(this.modo===2){
            // Se já foram digitado os dois operando, já é possível realizar a conta.
            this.executarConta();
            this.op=operador;
        }
        else if(this.modo===3){
            // Este caso acontece após realizar uma conta, e ainda assim aperta um operador
            // para continuar a calcular. (Não necessariamente o mesmo operador.)
            this.op=operador;
            this.modo=2;
        }
    },
    executarConta: function(){
        // Executa a conta normalmente, porém se der infinito ou NaN, o visor mostrará
        // NaN para indicar que houve erro. O JS mostra 'infinito' em uma divisão por 0, 
        // mesmo sabendo que não há um valor definido para uma divisão por 0.
        switch(this.op){
            case '+':
                this.resultado+=Number.parseFloat(this.numero);
                break;
            case '-':
                this.resultado-=Number.parseFloat(this.numero);
                break;
            case '*':
                this.resultado*=Number.parseFloat(this.numero);
                break;
            case '/':
                this.resultado/=Number.parseFloat(this.numero);
        }
        this.numero="";
        if(isNaN(this.resultado) || this.resultado===Infinity){
            this.resultado=NaN;
            this.modo=0;
        }else{
            this.modo=3;
        }
        this.mostrar();
    },
    finalizarConta: function(){ // Funciona quando aperta o botão de igual. 
        // Apenas para 'limpar' a operação vigente.
        if(this.modo===2){
            this.executarConta();
            this.op="";
        }
    },
    limpar: function(){ // 'Limpa' o visor da calculadora
        this.modo=1;
        this.elemento_visor.value="";
        this.resultado=0;
        this.op="";
        this.numero="";
    }
}