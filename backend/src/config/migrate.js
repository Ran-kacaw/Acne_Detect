const pool = require('./db')

const createTables = async () => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto"
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS detection_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,

        acne_level INTEGER DEFAULT 0,
        acne_label TEXT,
        acne_deskripsi TEXT,
        confidence NUMERIC(8,4) DEFAULT 0,
        confidence_pct VARCHAR(20),
        probabilities JSONB DEFAULT '{}',
        saran_dokter BOOLEAN DEFAULT false,

        skin_type VARCHAR(50),
        rekomendasi JSONB DEFAULT '[]',

        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await client.query(`
      ALTER TABLE detection_history
      ADD COLUMN IF NOT EXISTS acne_level INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS acne_label TEXT,
      ADD COLUMN IF NOT EXISTS acne_deskripsi TEXT,
      ADD COLUMN IF NOT EXISTS confidence NUMERIC(8,4) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS confidence_pct VARCHAR(20),
      ADD COLUMN IF NOT EXISTS probabilities JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS saran_dokter BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS skin_type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS rekomendasi JSONB DEFAULT '[]'
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_us (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS favorite_products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_key TEXT NOT NULL,
        product_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, product_key)
      )
    `)

    await client.query('COMMIT')
    console.log('✅ Database tables created successfully')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌ Migration failed:', err)
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

createTables().catch(console.error)