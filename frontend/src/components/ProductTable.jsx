const ProductTable = ({ products, onEdit, onDelete }) => {
  const showActions = Boolean(onEdit || onDelete)

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Price</th>
          {showActions && <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.name}</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.price}</td>
            {showActions && (
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                {onEdit && (
                  <button type="button" onClick={() => onEdit(product)} style={{ marginRight: '0.5rem' }}>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button type="button" onClick={() => onDelete(product.id)}>
                    Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable