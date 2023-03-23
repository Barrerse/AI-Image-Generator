import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    // call the backend to generate the image
    const generateImage = async () => {
      if (form.prompt) {
        try {
          setGeneratingImg(true);
          const response = await fetch('http://localhost:8080/api/v1/ai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          });
  
          const data = await response.json();
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        } catch (err) {
          alert(err);
        } finally {
          setGeneratingImg(false);
        }
      } else {
        alert('Please provide proper prompt');
      }
    };

    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const handleSupriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({ ...form, prompt: randomPrompt })
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]"> Create</h1>
                <p className="mt-2 text-[#606e77] text-[16px] max-w[500px]">Create captivating and breathtaking visuals that are powered by the cutting-edge DALL-E AI technology. Turn your wildest ideas into reality and share them with our vibrant community of creatives. Unleash your creativity and unlock a world of endless possibilities with AI-generated images!</p>
                <p> ** Application still under development by Sebastian Barrera ** </p>
            </div>

            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSupriseMe}
                    />

                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                            src={form.photo}
                            alt={form.prompt}
                            className="w-full h-full object-contain"
                          />
                          ) : (
                            <img
                              src={preview}
                              alt="preview"
                              className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}

                        {generatingImg && (
                           <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                         <Loader />
                         </div>
                            )}

                    </div>

                </div>

                <div className="mt-5 flex gap-5">
                        <button
                        type="button"
                        onClick={generateImage}
                        className="bg-[#6469ff] text-white font-medium text-sm w-full sm:w-auto py-3 px-5 rounded-lg text-center " >
                            
                           {generatingImg ? 'Generating...' : 'Generate Image'}
                        </button>
                </div>

                <div className="mt-10">
                <p className="mt-2 text-[#606e77] text-[14px]">Once you have created an image, feel free to share it with others in the community! </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
    )
}

export default CreatePost