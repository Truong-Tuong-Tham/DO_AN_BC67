import React from 'react'

const FAQDetailJob = () => {
  return (
    <div className="p-8">
      <div className="py-8 mt-12">
        <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">Frequently Asked Questions</h4>
        <p className="text-center text-gray-600 text-sm mt-2">Common questions related to choosing and working on freelancer jobs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
          {/* Question 1 */}
          <div className="flex space-x-8 mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700">How do I choose the right freelance job?</h4>
              <p className="text-gray-600 my-2">When selecting a job, carefully consider your skills, desired rate, and time availability. Review the client's requirements to ensure they align with your capabilities.</p>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline capitalize" title="Read More">Learn more</a>
            </div>
          </div>
          
          {/* Question 2 */}
          <div className="flex space-x-8 mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700">Can I take on multiple jobs at once?</h4>
              <p className="text-gray-600 my-2">Yes, you can take on multiple jobs at the same time. However, ensure that you have enough time and capacity to complete all tasks by their deadlines.</p>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline capitalize" title="Read More">Learn more</a>
            </div>
          </div>

          {/* Question 3 */}
          <div className="flex space-x-8 mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700">How do I price my freelance services?</h4>
              <p className="text-gray-600 my-2">You should calculate your rate based on the time required, your experience, and the complexity of the project. You can also look at other freelancers’ prices in similar fields for reference.</p>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline capitalize" title="Read More">Learn more</a>
            </div>
          </div>

          {/* Question 4 */}
          <div className="flex space-x-8 mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700">How do I ensure on-time project completion?</h4>
              <p className="text-gray-600 my-2">Create a detailed plan and break the work into manageable parts. Make sure you fully understand the client's requirements before starting the project.</p>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline capitalize" title="Read More">Learn more</a>
            </div>
          </div>

          {/* Question 5 */}
          <div className="flex space-x-8 mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700">How do I protect my freelancer rights?</h4>
              <p className="text-gray-600 my-2">Use reputable platforms, always sign a contract before starting a job, and only deliver the product after full payment from the client.</p>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline capitalize" title="Read More">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQDetailJob
