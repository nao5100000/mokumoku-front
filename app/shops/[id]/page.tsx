'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Input, Textarea, Button, Card, CardBody, Avatar, Chip, Divider, Progress } from '@heroui/react'
import Link from 'next/link'

type Review = {
  id: number
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

type ShopDetail = {
  id: number
  name: string
  category: string
  rating: number
  reviewCount: number
  images: string[]
  address: string
  priceRange: string
  hours: string
  phone: string
  website: string
  description: string
  features: string[]
  wifi: boolean
  power: boolean
  smoking: boolean
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: '田中太郎',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'WiFiが速くて作業がはかどります。コーヒーも美味しく、スタッフの対応も素晴らしいです。長時間の作業にも最適な環境でした。',
    date: '2024年1月15日',
    helpful: 12
  },
  {
    id: 2,
    userName: '佐藤花子',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    comment: '静かで集中できる環境です。電源席も多く、仕事や勉強に最適。ただ、混雑時は少し席が取りづらいかもしれません。',
    date: '2024年1月10日',
    helpful: 8
  },
  {
    id: 3,
    userName: '鈴木一郎',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    comment: '毎週利用しています。落ち着いた雰囲気で、リモートワークに最適です。ランチメニューも充実していて助かります。',
    date: '2024年1月5日',
    helpful: 15
  }
]

const mockShopDetail: ShopDetail = {
  id: 1,
  name: 'カフェ モクモク',
  category: 'カフェ',
  rating: 4.5,
  reviewCount: 127,
  images: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop'
  ],
  address: '東京都渋谷区道玄坂1-2-3 モクモクビル 2F',
  priceRange: '¥1,000-2,000',
  hours: '平日 8:00-22:00 / 土日祝 9:00-21:00',
  phone: '03-1234-5678',
  website: 'https://cafe-mokumoku.example.com',
  description: '落ち着いた雰囲気の中で、美味しいコーヒーとともに作業に集中できるカフェです。高速WiFi完備、電源席多数あり。',
  features: ['高速WiFi', '電源席多数', '個室あり', 'ミーティングスペース', '静音エリア'],
  wifi: true,
  power: true,
  smoking: false
}

export default function ShopDetailPage() {
  const params = useParams()
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [reviews, setReviews] = useState<Review[]>(mockReviews)

  const handleSubmitReview = () => {
    if (newReview.comment.trim()) {
      const review: Review = {
        id: reviews.length + 1,
        userName: 'ゲストユーザー',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('ja-JP'),
        helpful: 0
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 5, comment: '' })
    }
  }

  const ratingDistribution = {
    5: 65,
    4: 25,
    3: 7,
    2: 2,
    1: 1
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Link href="/shops" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          一覧に戻る
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardBody>
                <div className="mb-4">
                  <img
                    src={mockShopDetail.images[0]}
                    alt={mockShopDetail.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {mockShopDetail.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${mockShopDetail.name} ${index + 2}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                      />
                    ))}
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">{mockShopDetail.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⭐</span>
                    <span className="text-xl font-semibold">{mockShopDetail.rating}</span>
                    <span className="text-gray-500 ml-2">({mockShopDetail.reviewCount}件のレビュー)</span>
                  </div>
                  <Chip variant="bordered">{mockShopDetail.category}</Chip>
                </div>

                <p className="text-gray-700 mb-6">{mockShopDetail.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">営業時間</p>
                    <p className="font-medium">{mockShopDetail.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">価格帯</p>
                    <p className="font-medium">{mockShopDetail.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">電話番号</p>
                    <p className="font-medium">{mockShopDetail.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">住所</p>
                    <p className="font-medium">{mockShopDetail.address}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mockShopDetail.features.map((feature, index) => (
                    <Chip key={index} variant="flat" color="primary">{feature}</Chip>
                  ))}
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${mockShopDetail.wifi ? 'text-green-500' : 'text-gray-300'}`}>📶</span>
                    <span className="text-sm">WiFi {mockShopDetail.wifi ? 'あり' : 'なし'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${mockShopDetail.power ? 'text-green-500' : 'text-gray-300'}`}>🔌</span>
                    <span className="text-sm">電源 {mockShopDetail.power ? 'あり' : 'なし'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${!mockShopDetail.smoking ? 'text-green-500' : 'text-gray-300'}`}>🚭</span>
                    <span className="text-sm">{mockShopDetail.smoking ? '喫煙可' : '禁煙'}</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="mb-6">
              <CardBody>
                <h2 className="text-2xl font-bold mb-4">レビューを投稿</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">評価</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-3xl"
                      >
                        {star <= newReview.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="この場所での体験を共有してください..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  minRows={4}
                  className="mb-4"
                />
                <Button 
                  color="primary" 
                  size="lg"
                  onClick={handleSubmitReview}
                  className="w-full"
                >
                  レビューを投稿
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold mb-4">レビュー</h2>
                {reviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar src={review.userAvatar} size="lg" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.userName}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-lg">
                                {i < review.rating ? '⭐' : '☆'}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          👍 役に立った ({review.helpful})
                        </button>
                      </div>
                    </div>
                    <Divider className="my-4" />
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardBody>
                <h3 className="text-xl font-bold mb-4">評価の内訳</h3>
                <div className="space-y-3">
                  {Object.entries(ratingDistribution).reverse().map(([rating, percentage]) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-12">{rating}⭐</span>
                      <Progress 
                        value={percentage} 
                        className="flex-1"
                        color="warning"
                        size="sm"
                      />
                      <span className="text-sm text-gray-500 w-10">{percentage}%</span>
                    </div>
                  ))}
                </div>
                <Divider className="my-4" />
                <Button 
                  color="danger" 
                  variant="flat"
                  className="w-full"
                  startContent={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  }
                >
                  お気に入りに追加
                </Button>
                <Button 
                  color="primary" 
                  variant="solid"
                  className="w-full mt-2"
                  startContent={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                  }
                >
                  シェアする
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}