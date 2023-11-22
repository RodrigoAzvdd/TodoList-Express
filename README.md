## Comandos do MONGO:
    1- mongosh p iniciar o terminal do mongo
    2- db.nomeDaCollection.insert() => add um documento na collection
    3- db.nome.find() => encontra um documento com o parametro passado
    4- updateOne({nome: "nomeQueMuda"}, {$set: {name: "nomeAlterado}}) => muda um documento!! somente um 
    5- udpateMany => Muda varios
    6- deleteOne(param) => deleta o documento com o parametro passado

## Relacionamentos:
    Posso usar a chave de um elemento de uma collection em outra collection para fazer o relacionamento
    Tambem posso usar o elemento diferente dentro de uma so collecition!! para facilitar!! mas isso so é bom usar quando uso documentos simples

## Operadores:
    Posso usar o and, or ...
    ex:  db.nome.find({ $and: [ {name; 'test'}, {completed: true}]}) => vai selecionar todos os documentos com o nome test e completed true
    $exists: => consigo usar esse operador para saber se algum campo existe no documento => db.test.find({task: {$exists: name}})

## Outros:
    Posso usar o FindByIdAndDelete or Update => para achar e realizar essas acoes
    >> (id, {oq muda aqui => ex: name, desc})