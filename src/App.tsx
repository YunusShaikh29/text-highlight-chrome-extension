import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

type Highlight = {
  text: string
  url: string
  timestamp: number
}

export default function App() {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  useEffect(() => {
    chrome.storage.local.get({ highlights: [] }, (data) => {
      setHighlights(data.highlights)
    })
  }, [])

  const deleteHighlight = (timestamp: number) => {
    const updated = highlights.filter(h => h.timestamp !== timestamp)
    chrome.storage.local.set({ highlights: updated }, () => {
      setHighlights(updated)
    })
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Saved Highlights</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto space-y-4">
        {highlights.map((highlight) => (
          <div key={highlight.timestamp} className="group relative border rounded-lg p-4">
            <p className="text-sm mb-2">{highlight.text}</p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <a 
                href={highlight.url} 
                target="_blank" 
                className="hover:underline truncate max-w-[200px]"
              >
                {new URL(highlight.url).hostname}
              </a>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Highlight?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteHighlight(highlight.timestamp)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}