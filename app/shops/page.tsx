'use client'

import { useState } from 'react'
import { Input, Card, CardBody, CardFooter, Image, Chip } from '@heroui/react'
import Link from 'next/link'

type Shop = {
  id: number
  name: string
  category: string
  rating: number
  image: string
  address: string
  priceRange: string
}

const mockShops: Shop[] = [
  {
    id: 1,
    name: 'カフェ モクモク',
    category: 'カフェ',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    address: '東京都渋谷区',
    priceRange: '¥1,000-2,000'
  },
  {
    id: 2,
    name: 'スターバックス 渋谷店',
    category: 'カフェ',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop',
    address: '東京都渋谷区道玄坂',
    priceRange: '¥500-1,500'
  },
  {
    id: 3,
    name: 'コワーキングスペース SHARE',
    category: 'コワーキング',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    address: '東京都港区六本木',
    priceRange: '¥2,000/日'
  },
  {
    id: 4,
    name: 'ブルーボトルコーヒー',
    category: 'カフェ',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    address: '東京都新宿区',
    priceRange: '¥600-1,200'
  },
  {
    id: 5,
    name: 'WeWork 渋谷',
    category: 'コワーキング',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=400&h=300&fit=crop',
    address: '東京都渋谷区南平台',
    priceRange: '¥50,000/月〜'
  },
  {
    id: 6,
    name: 'タリーズコーヒー',
    category: 'カフェ',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop',
    address: '東京都千代田区丸の内',
    priceRange: '¥400-1,000'
  }
]

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFavorites = !showFavorites || favorites.includes(shop.id)
    return matchesSearch && matchesFavorites
  })

  const toggleFavorite = (shopId: number) => {
    setFavorites(prev => 
      prev.includes(shopId) 
        ? prev.filter(id => id !== shopId)
        : [...prev, shopId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">お店を探す</h1>
        
        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="店名、カテゴリー、エリアで検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            size="lg"
            startContent={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`p-3 rounded-lg transition-colors ${
              showFavorites 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 border border-gray-300'
            }`}
          >
            <svg className="w-6 h-6" fill={showFavorites ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Card key={shop.id} className="hover:shadow-xl transition-shadow">
              <CardBody className="p-0">
                <div className="relative">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(shop.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
                  >
                    <svg 
                      className={`w-5 h-5 ${favorites.includes(shop.id) ? 'text-red-500' : 'text-gray-400'}`} 
                      fill={favorites.includes(shop.id) ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{shop.name}</h3>
                    <Chip size="sm" variant="flat" color="warning">
                      ⭐ {shop.rating}
                    </Chip>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{shop.address}</p>
                  <div className="flex gap-2">
                    <Chip size="sm" variant="bordered">{shop.category}</Chip>
                    <Chip size="sm" variant="bordered">{shop.priceRange}</Chip>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Link href={`/shops/${shop.id}`} className="block w-full">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    詳細を見る
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するお店が見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  )
}