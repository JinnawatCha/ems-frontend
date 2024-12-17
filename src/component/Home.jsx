import React from 'react'
export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="diff aspect-[16/9]">
        <div className="diff-item-1">
          <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
            EMPLOYEE
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-base-200 grid place-content-center text-9xl font-black">MANAGEMENT</div>
        </div>
        <div className="diff-resizer"></div>
        
      </div>
    </div>
  )
}
