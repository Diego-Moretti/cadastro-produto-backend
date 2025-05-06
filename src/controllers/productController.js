import prisma from '../models/prismaClient.js';
import { validateProductData } from '../validations/productValidation.js';

export const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const errors = validateProductData(req.body);

    if (errors.length > 0) return res.status(400).json({ errors });

    const existing = await prisma.product.findUnique({ where: { name } });
    if (existing) return res.status(400).json({ error: 'Produto com esse nome já existe.' });

    const product = await prisma.product.create({ data: { name, description, price, stock } });
    res.status(201).json({ message: 'Produto criado com sucesso!', product });
};

export const getAllProducts = async (req, res) => {
    const { id, name } = req.query;

    let where = {};

    if (id) where.id = id;

    if (name) {
        where.name = {
            contains: name,
            mode: 'insensitive',
        };
    }

    try {
        const products = await prisma.product.findMany({ where });

        if (products.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado com os critérios fornecidos.' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};



export const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const {id} = req.params;

    const errors = validateProductData(req.body, true);

    if (errors.length > 0) return res.status(400).json({ errors });

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Produto não encontrado.' });

    if (name && name !== existing.name) {
        const nameCheck = await prisma.product.findUnique({ where: { name } });
        if (nameCheck) return res.status(400).json({ error: 'Já existe outro produto com esse nome.' });
    }

    const updated = await prisma.product.update({
        where: { id },
        data: { name, description, price, stock }
    });

    res.status(200).json(updated);
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Produto deletado com sucesso!' });
};
