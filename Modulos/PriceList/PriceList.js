var TabelaPreco = {
    create: (data) => {
        if (typeof data.name != 'string') {
            return {
                status: false,
                item: 'Tabela de Preço',
                error: 'O campo \'nome\' é obrigatório.'
            }
        }

        // Verifica se existe uma tabela com esse nome
        let verify = TabelaPreco.hasOne({
            name: data.name,
            group: data.group,
            deleted: false
        })

        if (verify) {
            return {
                status: false,
                item: 'Tabela de Preço',
                error: 'Já existe uma tabela com esse nome.'
            }
        }

        
    },
    add: (data) => {

    }
}