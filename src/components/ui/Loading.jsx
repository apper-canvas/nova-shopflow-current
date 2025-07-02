const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-max section-padding py-8">
        {/* Header Skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="card overflow-hidden">
                {/* Image Skeleton */}
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                
                {/* Content Skeleton */}
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-6 w-20 bg-gradient-to-r from-primary/20 to-blue-200 rounded"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shimmer Effect */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          .animate-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Loading