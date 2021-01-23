const tic_tac_toe = {
    //tabuleiro
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function () {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init: function (container) {
        this.container_element = container;
    },
    //function que efetua a jogada
    make_play: function (position) {
        //verifica se o jogo terminou 
        if (this.gameover) return false;
        //verifica a posição
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();
            //verificando se exiSte uma sequencia vencedora
            let winning_sequences_index = this.check_winning_sequences(this.simbols.options[this.simbols.turn_index]);
            //verificando se tem um ganhador
            if (winning_sequences_index >= 0) {
                //finaliza o jogo
                this.game_is_over();
            } else {
                //alternando o símbolo
                this.simbols.change();
            }
            return true;
        } else {
            //retorna false se for clicado em campos já preenchidos
            return false;
        }
    },
    //function que finaliza o jogo 
    game_is_over: function () {
        this.gameover = true;
        console.log("Game Over");
    },
    //verifica o vencedor
    check_winning_sequences: function (simbol) {
        for (i in this.winning_sequences) {
            //verificando se os símbolos estão na sequencia vencedora
            if (this.board[this.winning_sequences[i][0]] == simbol &&
                this.board[this.winning_sequences[i][1]] == simbol &&
                this.board[this.winning_sequences[i][2]] == simbol) {
                    console.log('Sequencia vencedora:' + simbol);
                    alert(simbol + ' Venceu a partida!');
                return i;//retorna a sequência vencedora
            }
        };
        return -1;
    },
    //fucntion que inicia ou reinicia o jogo
    start: function () {
        this.board.fill('');//zerando o tabuleiro
        this.draw();//renderiza o tabuleiro
        this.gameover = false;
    },
    //function que renderiza o tabulero na tela
    draw: function () {
        let content = '';
        for (i in this.board) {
            content += `<div onclick="tic_tac_toe.make_play(${i})">${this.board[i]}</div>`;
        }
        this.container_element.innerHTML = content;
    }
}