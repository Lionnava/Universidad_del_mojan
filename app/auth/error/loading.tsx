export default function AuthErrorLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando información del error...</p>
      </div>
    </div>
  )
}
