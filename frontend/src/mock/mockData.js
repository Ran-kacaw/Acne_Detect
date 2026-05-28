export const mockDetectionResult = {
  imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
  acneCount: 12,
  severity: 'Moderate',
  areas: ['Pipi Kiri', 'Dahi', 'Hidung'],
  products: [
    { id: 'p1', name: 'Salicylic Acid Cleanser', description: 'Pembersih wajah dengan asam salisilat', category: 'Cleanser', ingredients: 'Salicylic Acid 2%, Glycerin', usage: 'Gunakan 2x sehari', rating: 4.5, image: 'https://via.placeholder.com/150?text=Cleanser' },
    { id: 'p2', name: 'Niacinamide Serum', description: 'Serum untuk mengurangi kemerahan', category: 'Serum', ingredients: 'Niacinamide 10%, Zinc', usage: 'Gunakan di malam hari', rating: 4.7, image: 'https://via.placeholder.com/150?text=Serum' },
    { id: 'p3', name: 'Benzoyl Peroxide Gel', description: 'Gel untuk jerawat aktif', category: 'Treatment', ingredients: 'Benzoyl Peroxide 5%', usage: 'Oleskan pada area jerawat', rating: 4.3, image: 'https://via.placeholder.com/150?text=Gel' },
    { id: 'p4', name: 'Moisturizer Gel', description: 'Pelembap ringan untuk kulit berminyak', category: 'Moisturizer', ingredients: 'Hyaluronic Acid, Ceramide', usage: 'Gunakan setelah serum', rating: 4.6, image: 'https://via.placeholder.com/150?text=Moisturizer' },
    { id: 'p5', name: 'Sunscreen SPF 50', description: 'Tabir surya untuk melindungi kulit', category: 'Sunscreen', ingredients: 'Zinc Oxide, Titanium Dioxide', usage: 'Gunakan di pagi hari', rating: 4.8, image: 'https://via.placeholder.com/150?text=Sunscreen' },
    { id: 'p6', name: 'Retinol Night Cream', description: 'Krim malam untuk regenerasi kulit', category: 'Night Cream', ingredients: 'Retinol 0.5%, Peptide', usage: 'Gunakan 2-3x seminggu', rating: 4.4, image: 'https://via.placeholder.com/150?text=Night+Cream' },
  ],
}

export const mockProducts = mockDetectionResult.products

export const mockHistory = []


