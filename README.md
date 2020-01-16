Projeto de ERP Simples

A ideia original foi feito quando trabalhava na empresa NFSERVICE

ATENÇÃO: O Projeto ainda não está finalizado!

O objetivo do projeto por enquanto, é explicar o projeto de Refatoração do Relatório de DRE feito n NFSERVICE.
Futuramente este será um pequen ERP para que pequenas empresas ternham controle financeiro.

===========================================================

O que é DRE?

"O Demonstrativo de Resultados do Exercício (DRE) é um relatório que oferece uma síntese econômica completa das atividades operacionais e não operacionais de uma empresa em um determinado período de tempo, demonstrando claramente se há lucro ou prejuízo."

Fonte: https://www.treasy.com.br/blog/dre-demonstrativo-de-resultados-do-exercicio/

Como o Relatório Funciona

Parte 1 - Centros de Custos

    - Existem 4 níveis de Centros de Custos e cada um pode ser do tipo Receita, Despesa ou Ambos.
    - Um Centro de Custos nível 2, precisa estar relacionado a um Centro de Custos nível 1, assim como um nível 3 com um nível 2 e assim por diante.
    - Cada Centro de Custos pode ter vários Centros de Custos relacionados a ele (Exemplo: um Centro de Custos nível 1 pode ter vários Centros de Custos nível 2 relacionados a ele, sendo assim chamados de "Filhos" dele)
    - Um Centro de Custo de Receita só pode ser vinculado a algo (seja NFe emitida, uma conta a ser paga / recebida), se o tipo dela esteja de acordo com aquilo em que ele é vinculado (Exemplo: Uma Conta a ser Paga só poder ter vinculo com Centros de Custos do tipo Despesa ou Ambos).
    - Os valores totais dos Centros de Custos nível 3 e 4 são calculados com base nas coisas com quias eles estão vinculados, já os nível 1 e 2 são calculados assim:
    - Nível 1 é a soma do valor total de todos os Centros de Custos nível 2 relacionados a ele.
    - Nível 2 é a soma do valor total de todos os Centros de Custos nível 3 e 4 relacionados a ele.

Parte 2 - Níveis de DRE para os Centros de Custos

    - Os "Níveis de DRE" são apenas as "Camadas" do Relatório de DRE, sendo alguns deles valores derivados dos Centros de Custos (Níveis Completos) e outros derivados de cálculos feitos a partir do valor dos Níveis Completos (Sub-Níveis).
    - Nível 1 -> Resultado da Soma dos Valores dos Centros de Custos de Receitas
    - Nível 2 -> Resultado da Soma dos Valores dos Centros de Custos de Despesas I
    - Nível 2.1 -> Resultado da Subtração de Nível 2 do Nível 1 (Nível 2 - Nível 1)
    - Nível 3 -> Resultado da Soma dos Valores dos Centros de Custos de Despesas II
    - Nível 3.1 -> Resultado da Subtração de Nível 3 do Nível 2.1 (Nível 2.1 - Nível 3)
    - Nível 4 -> Resultado da Soma dos Valores dos Centros de Custos de Despesas III
    - Nível 4.1 -> Resultado da Soma dos Níveis 2 e 3
    - Nível 4.2 -> Resultado da Subtração de Nível 4 do Nível 3.1 (Nível 3.1 - Nível 4)
    - Nível 5 -> Resultado da Soma dos Valores dos Centros de Custos de Despesas IV
    - Nível 5.1 -> Resultado da Subtração de Nível 5 do Nível 4.2 (Nível 4.2 - Nível 5)

Parte 3 - Configuração do Relatório

    - Para configurar o relatório, é necessário escolher os Centros de Custos que irão aparecer em cada parte dele.
    - Só é possível selecionar Centros de Custos de nível 1, com isso todos os seus "Filhos" (Centros de Custos de nível mais baixo que estão relacionados a ele), irão aparecer no relatório.

Parte 4 - Execução da Função Passo a Passo

    - Na tela do relatório, o usuário escolhe um período (Mensal ou Anual), uma data (caso Mensal => Mês/Ano, caso Anual => Ano), e o campo para saber se a data corresponde a Data de Emissão ou Vencimento da Nota.
    - Depois de configurar os dados, o usuário seleciona qual tipo de relatório ele quer que seja gerado, PDF, Excel ou Visualização Online e é feita a chamada da função.
    - Ao chegar na função é feita a verificação de dados, para saber se eles estão preenchidos e corretamente.
    - Feita a verificação da formatação do Período Escolhido, para saber se o relatório é Mensal ou Anual, e definir o período de tempo a ser buscado.
    - Abaixo disso, é feita a definição de um "Função Interna", usada para formatar os dados dos Centros de Custo de Receitas e Despesas. Isso é feito pois os dados estão estruturados do mesmo modo, com a diferença sendo apenas os nomes dos campos.
    - Feita a busca pelas configurações de DRE
    - Como o vinculo entre Centros de Custos é feito diretamente na Tabela de Centros de Custos (Em termos mais leigos, é como se cada Centro de Custos apontasse apenas diretamente pro seu "Pai"), e apenas os IDs (identificadores) dos Centros de Custos nível 1 são salvos nas configurações de DRE, foi necessário montar uma Query (Query seria o modo de fazer a busca pelas informações) recursiva, que buscava pelos "Filhos" recursivamente.
    - Infelizmente pela falta de tempo, foi feita uma busca por todos os Centros de Custos cadastrados e depois a reestruturação dos dados, combinando assim os pais com os filhos (Em cada posição "Pai", existe uma posição "Filhos", e dentro dela as informações de seus filhos e assim por diante)
    - Após buscar todos os Centros de Custos, os IDs deles são extraídos e armazenados em uma variável.
    - Feita a busca pelas Receitas com os Centros de Custos Cadastrados (Nível de DRE 1).
    - Feita a busca pelas Despesas com os Centros de Custos Cadastrados (Nível de DRE 2, 3, 4 e 5).
    - Feito um loop passando por cada nível do DRE
    - Para cada nível de DRE, é feita a verificação se é um Nível Completo ou um Sub-Nível
    - Caso seja um Nível Completo, é feita a verificação de qual o formato de relatório desejado (PDF, Excel ou Visualização Online) e iniciada a montagem dos dados para serem enviados ao FrontEnd
    - É utilizada a função "organizaTabela", uma função recursiva que formata dos dados do relatório no formato de visualização desejado
    - Depois que os dados são retornados da função "organizaTabela", é feito o calculo do valor daquele nível
    - Caso seja um Sub-Nível, é feito o calculo o calculo de seu valor
    - Após essa primeira formatação, é feita a formatação seguinte transformando os valores em R$ e adaptando ao tipo de visualização desejado

Parte 5 - Exibição

    - É utilizada uma função recursiva para exibir os dados, do relatório.
    - Caso seja o formato seja PDF ou Excel, os Filhos dos Centros de Custos são identificados por underlines, fazendo com que seus nomes fiquem mais a direita dependendo se ele é Filho, Neto, ou Bisneto do Centro de Custo de Nível 1
    - Caso seja uma Visualização Online, ele é renderizado na mesma tela, utilizando uma classe para cada Nível, fazendo com que seu nome fique mais a direita, assim como no PDF

Parte 6 - Contas Relacionadas

    - Essa opção é disponível apenas para a Visualização Online
    - Ao clicar em um dos Centros de Custos, é feita a busca pelas Contas relacionadas aquele Centro de Custos, e exibidas as seguintes informações: Nro da Conta, Cliente, Data de Emissão, Data de Vencimento, Valor