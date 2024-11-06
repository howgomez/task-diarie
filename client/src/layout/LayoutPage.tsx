

interface LayoutPageProps {
  children: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutPageProps) => {

  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen">
      {children}
    </div>
  )
}