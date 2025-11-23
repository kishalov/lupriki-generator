import { Card, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
  <div className="min-h-screen w-full flex items-center justify-center">
    <Card>
        <CardTitle className="text-center">Привет!</CardTitle>
        <CardDescription className="text-center">Тут что-то будет</CardDescription>
    </Card>
  </div>
  )
}
