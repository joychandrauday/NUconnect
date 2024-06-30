import React from 'react';
import SyllabusHomeSlider from './SyllabusHomeSlider';

const SyllabusHome = () => {
    return (
        <div  className='py-16 mx-auto'>
            <h1 className='text-3xl font-bold text-center pb-10'>Detailed Syllabus of Every Depertment.</h1>
            
            <SyllabusHomeSlider />
        </div>
    );
};

export default SyllabusHome;