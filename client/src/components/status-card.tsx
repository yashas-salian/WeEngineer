import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Files, Newspaper, NotebookTabs, TrendingUp } from "lucide-react"
import { useCustomHook } from "../hooks/use-pdf"

export const StatusCard = () =>{
    const showStats = true
    const { pdf } = useCustomHook()
    
        const stats = {
          totalFiles: pdf.length,
          totalDownloads: 1247,
          activeUsers: 89,
          weeklyGrowth: 12.5,
        }
    return <div data-aos="zoom-in">
    <AnimatePresence>
    //               {showStats && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 mb-8"
                    >
                      <Card className="z-30 bg-[rgba(12,12,12,0.6)] border border-neutral-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">Total Files</p>
                              <p className="text-3xl font-bold text-white">{stats.totalFiles}</p>
                            </div>
                            <Files className="h-8 w-8 text-orange-700" />
                          </div>
                        </CardContent>
                      </Card>
    
                      <Card className="z-30 bg-[rgba(12,12,12,0.6)] border border-neutral-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">PYQ's </p>
                              <p className="text-3xl font-bold text-white">{stats.totalDownloads}</p>
                            </div>
                            <Newspaper className="h-8 w-8 text-yellow-700" />
                          </div>
                        </CardContent>
                      </Card>
    
                      <Card className="z-30 bg-[rgba(12,12,12,0.6)] border border-neutral-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">Notes</p>
                              <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
                            </div>
                            <NotebookTabs className="h-8 w-8 text-blue-900" />
                          </div>
                        </CardContent>
                      </Card>
    
                      <Card className="z-30 bg-[rgba(12,12,12,0.6)] border border-neutral-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">Quiz</p>
                              <p className="text-3xl font-bold text-white">{stats.weeklyGrowth}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-700" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
}