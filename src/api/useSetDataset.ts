import { useState, useCallback } from 'react'
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from 'api/firebase'
import { TypeDataset } from 'types'

export const useSetDataset = () => {
  const [dataset, setDataset] = useState<TypeDataset[]>([])

  const getCollections = useCallback(() => {
    const q = query(collection(db, 'questions'))
    const unSub = onSnapshot(q, (snapshot) => {
      setDataset(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          answers: doc.data().answers,
          question: doc.data().question,
        }))
      )
    })
    return () => {
      unSub()
    }
  }, [])
  return { getCollections, dataset }
}
