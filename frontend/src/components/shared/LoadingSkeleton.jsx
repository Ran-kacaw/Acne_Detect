import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
          <Skeleton height={160} className="rounded-lg mb-3" />
          <Skeleton height={20} width="70%" className="mb-2" />
          <Skeleton height={14} width="90%" className="mb-1" />
          <Skeleton height={14} width="50%" />
        </div>
      ))}
    </>
  )
}

export const ListSkeleton = ({ count = 4 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-center">
          <Skeleton circle height={56} width={56} />
          <div className="flex-1">
            <Skeleton height={18} width="40%" className="mb-2" />
            <Skeleton height={14} width="60%" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const DetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton height={280} className="rounded-xl" />
      <Skeleton height={28} width="60%" />
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="80%" />
      <Skeleton height={16} width="70%" />
    </div>
  )
}

export default CardSkeleton

