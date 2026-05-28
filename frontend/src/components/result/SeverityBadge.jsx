import React from 'react'

const severityStyles = {
  Mild: 'bg-severity-mild-bg text-severity-mild-text',
  Moderate: 'bg-severity-moderate-bg text-severity-moderate-text',
  Severe: 'bg-severity-severe-bg text-severity-severe-text',
}

const SeverityBadge = ({ severity }) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        severityStyles[severity] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {severity}
    </span>
  )
}

export default SeverityBadge

