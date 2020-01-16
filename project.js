function getDataDre(req, res) {
    var groupId = 1;
    var niveisDre = {
        1: 'Centros de Custos de Receitas',
        2: 'Centros de Custos de Despesas I',
        2.1: 'Margem de Contribuição',
        3: 'Centros de Custos de Despesas II',
        3.1: 'Lucro Operacional Antes dos Investimentos',
        4: 'Centros de Custos de Despesas III',
        4.1: 'Despesa Operacional Total',
        4.2: 'Lucro Operacional Total',
        5: 'Centros de Custos de Despesas IV',
        5.1: 'Resultado Liquido'
    };

    var date = req.query.date.split('/');
    var initialDate, finalDate, receitasField, despesasField, tabela = [];

    switch (date.length) {
        case 1:
            initialDate = [ date[0], 01, 01 ];
            initialDate = initialDate.join('-');

            finalDate = [ (parseInt(date[0]) + 1), 01, 01 ];
            finalDate = finalDate.join('-');
            break;
        case 2:
            initialDate = [ date[1], date[0], 01 ];
            initialDate = initialDate.join('-');

            finalDate = [ date[1], (parseInt(date[0]) + 1), 01 ];
            finalDate = finalDate.join('-');
            break;
        default:

            break;
    }

    switch (req.query.order) {
        case 4:
            receitasField = 'dataVencimento';
            despesasField = 'dataEmissao';
            break;
        case 2:
            receitasField = 'dataVencimento';
            despesasField = 'dataVencimento';
            break;
        case 3:
            receitasField = 'dataEmissao';
            despesasField = 'dataVencimento';
            break;
        case 1:
        default:
            receitasField = 'dataEmissao';
            despesasField = 'dataEmissao';
            break;
    }

    var dreConfig = Dre.find({
        where: {
            groupId: groupId
        },
        group: [ 'nivel' ]
    });

    var dreIds = Utility.extract(dreConfig, '#.#.centroCustoId');

    var centros = Utility.combineByParent(CentroCusto.findChildren({
        where: {
            id: dreIds
        }
    }));

    var receitas = CentrosReceber.find({
        where: {
            groupId: groupId,
            'receitasField': {
                $gte: initialDate,
                $lt: finalDate
            }
        },
        join: [ 'contas_receber' ]
    });

    var despesas = CentrosPagar.find({
        where: {
            groupId: groupId,
            'despesasField': {
                $gte: initialDate,
                $lt: finalDate
            }
        },
        join: [ 'contas_pagar' ]
    });

    var organizeTable = (centro, extras) => {
        let tabela, tempVal = 0.00;

        if (extras.profundidade > 2) {
            if (extras.nivel == 1) {
                tempVal = (Utility.notUnd(receitas[centro.id]) ? receitas[centro.id] : 0.00);
            } else {
                tempVal = (Utility.notUnd(despesas[centro.id]) ? despesas[centro.id] : 0.00);
            }
        }

        tabela[extras.nivel] = {
            id: centro.id,
            nome: '<p class="'+extras.nivel+'">'+centro.nome+'</p>',
            valor: tempVal
        }

        if (Utility.notUnd(centro.children)) {
            for (let i in centro.children) {
                let retorno = organizeTable(centros[dreConfig[nivel][i]], {
                    nivel: extras.nivel,
                    profundidade: (extras.profundidade + 1)
                });

                tabela = { ...tabela, ...retorno.tabela };
                tempVal += retorno.valor;
            }
        }

        if (extras.profundidade < 3) {
            tabela[extras.nivel].valor = tempVal;
        }

        return {
            tabela: tabela,
            valor: tempVal
        }
    }

    for (let nivel in dreConfig) {
        if (Utility.isInt(Number(nivel))) { // Caso seja um dos valores Independentes
            for (let i in dreConfig[nivel]) {
                let retorno = organizeTable(centros[dreConfig[nivel][i]], {
                    nivel: nivel,
                    profundidade: 1
                });
            }
        } else { // Caso seja um valor a ser calculado
            switch (nivel) {
                case '2.1':
            }

        }
    }
}