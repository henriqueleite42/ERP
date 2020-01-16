<?php
private function organizaTabela($centro, $extras)
{
    switch ($extras['formato']) {
        case 4:
            $margin = (($extras['profundidade'] - 1) * 40);
            $pre = '<p style="margin: 0; padding: 0; margin-left: '.$margin.'px;">';
            $pos = '</p>';
            break;
        case 1:
        default:
            $pre = '';
            $pos = '';
            for ($i = 1; $i < $extras['profundidade']; $i++) {
                $pre .= '__';
            }
            break;
    }
    $tempVal = ($extras['nivel'] == 1 ? (isset($extras['receitas'][$centro['CustoContabil']['id']]) ? $extras['receitas'][$centro['CustoContabil']['id']] : 0.00) : (isset($extras['despesas'][$centro['CustoContabil']['id']]) ? $extras['despesas'][$centro['CustoContabil']['id']] : 0.00));
    $tabela[$extras['nivel'].'-'.$centro['CustoContabil']['id']] = [
        'id' => $centro['CustoContabil']['id'],
        'nome' => $pre.$centro['CustoContabil']['cod_contabil'].' - '.$centro['CustoContabil']['descricao'].$pos,
        'valor' => $tempVal
    ];
    //Define uma variavel de valor para calcular o Total dos Centros de Nivel 1 e 2
    $valor = ($extras['profundidade'] > 2 ? $tempVal : 0);
    // Chama Recursivamente para organizar os filhos dos filhos tbm
    foreach ($centro['children'] as $key => $outroCentro) {
        $retorno = $this->organizaTabela($outroCentro, [
            'profundidade' => $extras['profundidade'] + 1,
            'despesas' => $extras['despesas'],
            'receitas' => $extras['receitas'],
            'formato' => $extras['formato'],
            'nivel' => $extras['nivel']
        ]);
        $tabela = $tabela + $retorno['tabela'];
        $valor += $retorno['valor'];
    }
    if ($extras['profundidade'] < 3) {
        $tabela[$extras['nivel'].'-'.$centro['CustoContabil']['id']]['valor'] = $valor;
    }
    return [
        'tabela' => $tabela,
        'valor' => $valor
    ];
}


switch ($nivel) {
    case 2.1:
        $tabela[$rKey]['Dependentes'][] = [
            'nome' => $nome,
            'valor' => ($tabela[$rKey - 1]['Total']['valor'] - $tabela[$rKey]['Total']['valor'])
        ];
        break;
    case 4.1:
        $valor = 0;
        for ($i = 2; $i < $nivel; $i++) {
            $valor += $tabela[$i]['Total']['valor'];
        }
        $tabela[$rKey]['Dependentes'][] = [
            'nome' => $nome,
            'valor' => $valor
        ];
        break;
    case 3.1:
    case 4.2:
    case 5.1:
        $tabela[$rKey]['Dependentes'][] = [
            'nome' => $nome,
            'valor' => ($tabela[$rKey - 1]['Dependentes'][($rKey > 4 ? 1 : 0)]['valor'] - $tabela[$rKey]['Total']['valor'])
        ];
        break;
}