import React from 'react'
import GitHubCalendar from 'react-github-calendar'

const Chart = () => {
  return (
    <>
        <div className='tsx-c54e851bb599f524 rounded-lg border border-green-900 p-4 sm:p-6'>
            <div className='tsx-c54e851bb599f524 text-white mb-4 flex flex-col space-y-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                <div className='jsx-c54e851bb599f524 flex items-center space-x-2'>
                    <h2 className='text-lg'>
                        <a className='hover: text-grey' href='https://github.com/animesh-94'>Contributions</a>
                    </h2>
                </div>
            </div>
            <GitHubCalendar username='animesh-94' />
        </div>
    </>
  )
}

export default Chart;
