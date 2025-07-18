import React, { useEffect, useState, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import TextInput from '../../components/Inputs/TextInput';
import SearchInput from '../../components/Inputs/SearchInput';
import Button from '../../components/Button/Button';
import { toast } from 'sonner';
import ProductCard from '../../components/ProductCard/ProductCard';
import Modal from '../../components/Modal/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product as FirestoreProduct } from '../../hooks/useProducts';
import styles from './AdminPage.module.scss';

const ITEMS_PER_PAGE = 8;

type ProductForm = {
  title: string;
  price: string;
  description: string;
  category: string;
  images: string;
};

const AdminPage: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>({ title: '', price: '', description: '', category: '', images: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'products'));
      const list = snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
        id: d.id,
        ...(d.data() as Omit<FirestoreProduct, 'id'>),
      }));
      setProducts(list);
    } catch {
      toast.error('Ocurrió un error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = Array.from(new Set(products.map(p => p.category))).sort();

  const parsePrice = (val: string): number | null => {
    if (!/^\d+(?:,\d{1,2})?$/.test(val)) return null;
    return parseFloat(val.replace(',', '.'));
  };

  const validateForm = (): boolean => {
    if (!form.title.trim()) {
      toast.error('El nombre del producto es obligatorio.');
      return false;
    }
    const priceNum = parsePrice(form.price);
    if (priceNum === null || priceNum <= 0) {
      toast.error('Precio inválido. Usa el formato 1234,56');
      return false;
    }
    if (form.description.trim().length < 10) {
      toast.error('La descripción debe tener al menos 10 caracteres.');
      return false;
    }
    return true;
  };

  const openNew = () => {
    setForm({ title: '', price: '', description: '', category: '', images: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEdit = (p: FirestoreProduct) => {
    setForm({
      title: p.title,
      price: p.price.toFixed(2).replace('.', ','),
      description: p.description,
      category: p.category,
      images: p.images.join(', ')
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const payload = {
      title: form.title,
      price: parsePrice(form.price)!,
      description: form.description,
      category: form.category,
      images: form.images.split(',').map(s => s.trim())
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), payload);
        setProducts(ps => ps.map(x => x.id === editingId ? { ...x, ...payload } : x));
        toast.success('Producto actualizado correctamente.');
      } else {
        const ref = await addDoc(collection(db, 'products'), payload);
        setProducts(ps => [...ps, { id: ref.id, ...payload }]);
        toast.success('Producto creado exitosamente.');
      }
      setIsModalOpen(false);
    } catch {
      toast.error('Error al guardar el producto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'products', deleteTargetId));
      setProducts(ps => ps.filter(x => x.id !== deleteTargetId));
      toast.success('Producto eliminado correctamente.');
    } catch {
      toast.error('Error al eliminar el producto.');
    } finally {
      setDeleteTargetId(null);
      setLoading(false);
    }
  };

  const listFiltered = products
    .filter(p => !filterCat || p.category === filterCat)
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(listFiltered.length / ITEMS_PER_PAGE);
  const pageItems = listFiltered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterCat]);

  if (authLoading) return <output>Cargando sesión…</output>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.heading}>Panel de Administración</h1>
      </header>

      <section className={styles.controls}>
        <SearchInput
          placeholder="Buscar productos por nombre…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className={styles.filter}>
          <select
            aria-label="Filtrar por categoría"
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Button onClick={openNew} color="secondary" aria-label="Agregar nuevo producto">
          + Nuevo producto
        </Button>
      </section>

      {loading ? (
        <output>Cargando productos…</output>
      ) : (
        <motion.section
          className={styles.cardGrid}
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          role="list"
          aria-label="Lista de productos"
        >
          <AnimatePresence>
            {pageItems.map(p => (
              <motion.div
                key={p.id}
                className={styles.cardWrapper}
                variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                exit={{ scale: 0.8, opacity: 0 }}
                role="listitem"
                aria-label={`Producto: ${p.title}`}
              >
                <ProductCard product={p} disableNavigation />
                <div className={styles.cardActions}>
                  <Button onClick={() => openEdit(p)} aria-label={`Editar producto ${p.title}`}>Editar</Button>
                  <Button onClick={() => setDeleteTargetId(p.id)} aria-label={`Eliminar producto ${p.title}`}>Eliminar</Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      )}

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Paginación de productos">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</Button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? styles.activePage : ''}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</Button>
        </nav>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <Modal open onClose={() => setIsModalOpen(false)}>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
              <h2 className={styles.modalTitle}>{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <TextInput label="Nombre *" value={form.title} required onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <TextInput label="Precio (1234,56) *" value={form.price} required onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                <TextInput label="Categoría" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                <TextInput label="URLs de imágenes (separadas por coma)" value={form.images} onChange={e => setForm(f => ({ ...f, images: e.target.value }))} />
                <div className={styles.fieldFull}>
                  <label htmlFor="descripcion">Descripción *</label>
                  <textarea
                    id="descripcion"
                    rows={4}
                    value={form.description}
                    required
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.actions}>
                  <Button type="submit" disabled={loading}>{editingId ? 'Guardar cambios' : 'Crear producto'}</Button>
                </div>
              </form>
            </motion.div>
          </Modal>
        )}

        {deleteTargetId && (
          <Modal open onClose={() => setDeleteTargetId(null)}>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
              <h2 className={styles.modalTitle}>¿Eliminar producto?</h2>
              <p>¿Estás segura de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
              <div className={styles.actions}>
                <Button onClick={() => setDeleteTargetId(null)} color="primary">Cancelar</Button>
                <Button onClick={handleDelete} color="secondary" disabled={loading}>Eliminar</Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminPage;
