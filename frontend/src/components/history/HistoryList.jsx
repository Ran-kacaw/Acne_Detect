import React from 'react'
import HistoryCard from './HistoryCard'
import EmptyState from './EmptyState'
import { ListSkeleton } from '../shared/LoadingSkeleton'
import ScrollReveal from '../shared/ScrollReveal'

const HistoryList = ({ historyList, loading, onDelete }) => {
  if (loading) {
    return <ListSkeleton count={3} />
  }

  if (!historyList || historyList.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-[13px]">
      {historyList.map((item, i) => (
        <ScrollReveal key={item.id} delay={i * 80}>
          <HistoryCard item={item} onDelete={onDelete} />
        </ScrollReveal>
      ))}
    </div>
  )
}

export default HistoryList