import ReportTable from './ReportTable'
import { onShowReportsById } from '../../functions/Reports/onShowReportsById.telefunc'

import { useState, useEffect } from 'react'

export default function Reports({ userId } : {userId: string} ) {

  const [reportData, setReportData] = useState([])
  const data = []


  useEffect(() => {
    onShowReportsById(userId).then((result) => {
      setReportData(result)
      console.log(result)
    })
  }, [])
  

  return (
    <>
        <h1>Reports Page</h1>
        {
          console.log(reportData)
        }
        <ReportTable reportData={ [] } />
    </>
  )
}
 