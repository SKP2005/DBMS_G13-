import {React} from 'react'
// import "./testimonnials.css";

export const Testimonnials = () => {

  return (
    <div>
       <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            What our <span class="text-blue-500 ">clients</span> say
        </h1>

        <p class="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
            Our clients' satisfaction is our greatest measure of success, and we take pride in consistently delivering exceptional services and a website experience that exceeds expectations.
        </p>

        <div class="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
            <div class="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
                <p class="leading-loose text-gray-500 dark:text-gray-300">
                    “I was at a point in my life where I felt lost and overwhelmed, unsure of how to navigate the challenges I was facing. From the moment I reached out, they provided a lifeline of support that I desperately needed. The counselors at there not only listened with empathy but also empowered me with tools to confront my issues head-on. Through their guidance and understanding, I discovered the strength within me to overcome obstacles I once thought insurmountable. Thanks to their expertise, I now feel more confident, resilient, and equipped to tackle life's ups and downs.”
                </p>

                <div class="flex items-center mt-6">
                    <img class="object-cover rounded-full w-12 h-12" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                    
                    <div class="mx-4">
                        <h1 class="font-semibold text-blue-500">Robert</h1>
                        <span class="text-sm text-gray-500 dark:text-gray-300">SDE, Amazon</span>
                    </div>
                </div>
            </div>

            <div class="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
                <p class="leading-loose text-gray-500 dark:text-gray-300">
                    “Before reaching out, I was struggling with a myriad of personal challenges that left me feeling overwhelmed and defeated. However, the support and guidance I received from the incredible counselors there turned my life around. They not only provided me with a safe and non-judgmental space to open up about my struggles but also equipped me with practical strategies to address them. It's remarkable how much progress I've made with their assistance. I now feel more resilient, in control, and optimistic about the future.”
                </p>

                <div class="flex items-center mt-6">
                    <img class="object-cover rounded-full w-12 h-12" src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>
                    
                    <div class="mx-4">
                        <h1 class="font-semibold text-blue-500">Mia Brown</h1>
                        <span class="text-sm text-gray-500 dark:text-gray-300">Marketing Manager, Stech</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default Testimonnials;