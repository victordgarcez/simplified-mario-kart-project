const mario = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0
};

const luigi = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0
};

const yoshi = {
    NOME : "Yoshi",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 4,
    PODER : 3,
    PONTOS : 0
};

const peach = {
    NOME : "Peach",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 2,
    PONTOS : 0
};

const bowser = {
    NOME : "Bowser",
    VELOCIDADE : 5,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
};

const donkeyKong = {
    NOME : "Donkey Kong",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
};

async function firstPickPlayer(firstPick){
     player1 = 0;   
    
switch(firstPick){
    case 1:
        player1 = mario;
        break;
    case 2:
        player1 = peach;
        break;
    case 3:
        player1 = yoshi;
        break;
    case 4:
        player1 = bowser;
        break;
    case 5:
        player1 = luigi;
        break;
    case 6:
        player1 = donkeyKong;
        break;
    default:
        console.log("Opção inválida");
    }
   return player1
}

async function secondPickPlayer(secondPick){
     player2 = 0;  
    switch(secondPick){
    case 1:
        player2 = mario;
        break;
    case 2:
        player2 = peach;
        break;
    case 3:
        player2 = yoshi;
        break;
    case 4:
        player2 = bowser;
        break;
    case 5:
        player2 = luigi;
        break;
    case 6:
        player2 = donkeyKong;
        break;
    default:
        console.log("Opção inválida");
}
    return player2
}


async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66: 
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, atribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
        
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE)
        }
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE)
        }
        
        if(block === "CONFRONTO"){
            totalTestSkill1 = diceResult1 + character1.PODER
            totalTestSkill2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`)

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER)

            if(totalTestSkill1 > totalTestSkill2){
	            if(character2.PONTOS > 0){
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto. 🐢`)
                    character2.PONTOS--;
                }else if (character2.PONTOS == 0){
                    console.log(`${character2.NOME} está com 0 pontos, não é possível ficar com pontuação negativa!`)
                }
            }
            if(totalTestSkill2 > totalTestSkill1){
	           if( character1.PONTOS> 0){
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto. 🐢`)
                    character1.PONTOS--;
                }else if (character1.PONTOS == 0){
                    console.log(`${character1.NOME} está com 0 pontos, não é possível ficar com pontuação negativa!`)
                }
            }
            if(totalTestSkill2 === totalTestSkill1){
                console.log("Confronto empatado! Nenhum ponto perdido!")
            }
        }

        if(totalTestSkill1 > totalTestSkill2 && block != "CONFRONTO"){
            console.log(`${character1.NOME} Marcou 1 ponto!`);
            character1.PONTOS++
        } else if(totalTestSkill2 > totalTestSkill1 && block != "CONFRONTO"){
            console.log(`${character2.NOME} Marcou 1 ponto!`);
            character2.PONTOS++
        } else if (totalTestSkill1 == totalTestSkill2){
            console.log("Rodada empatada!")
        }
        console.log("------------------------------------------------")
    }

}

async function declareWinner(character1, character2){
    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n ${character1.NOME} venceu a corrida!🏆`)
    } else if (character2.PONTOS > character1.PONTOS){
        console.log(`\n ${character2.NOME} venceu a corrida!🏆`)
    } else {
        console.log("EMPATE!")
    }
}
(async function main(){
    const prompt = require('prompt-sync')();
    
    console.log("ESCOLHA DE PERSONAGENS:")
    console.log("1 - Mario")
    console.log("2 - Peach")
    console.log("3 - Yoshi")
    console.log("4 - Bowser")
    console.log("5 - Luigi")
    console.log("6 - Donkey Kong")

    let firstPick = parseInt(prompt("Digite o número do primeiro competidor: "))
    let player1 =  await firstPickPlayer(firstPick)

    let secondPick = parseInt(prompt("Digite o número do segundo competidor: "))
    let player2 =  await secondPickPlayer(secondPick)

    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()


