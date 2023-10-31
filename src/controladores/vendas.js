const pool = require("../conexao");

const venda = async (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body;

    try{
        const cliente = await pool.query('select * from clientes where id = $1', [cliente_id]);

        if(cliente.rowCount < 1){
            return res.status(404).json({mensagem: 'Cliente não encontrado'})
        };

        const produto = await pool.query('select * from produtos where id = $1', [produto_id]);

        if(produto.rowCount < 1){
            return res.status(404).json({mensagem: 'Produto não encontrado'})
        };

        if(quantidade < 1){
            return res.status(400).json({mensagem: 'A quantidade é de no minimo 1'})
        };

        const vendaRealizada = await pool.query("insert into vendas (cliente_id, produto_id, quantidade) values ($1, $2, $3) returning *",
        [cliente_id, produto_id, quantidade]);

        return res.status(201).json(vendaRealizada.rows[0])

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
};

module.exports = {
    venda
}