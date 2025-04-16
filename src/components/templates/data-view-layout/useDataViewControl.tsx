import { useRef } from "react"
import { DataViewCommands, UseDataViewControlReturn } from "./types.d"

export const useDataViewControl = (): UseDataViewControlReturn => {
   const ref = useRef<DataViewCommands>(null)

   const getId = (): string | undefined => ref.current?.getId()

   return {
      ref,
      getId
   }
}