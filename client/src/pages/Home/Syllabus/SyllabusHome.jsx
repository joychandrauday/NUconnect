import React from 'react';
import SyllabusHomeSlider from './SyllabusHomeSlider';

const SyllabusHome = () => {
    return (
        <div  className='py-8 container mx-auto'>
            <h1 className='text-3xl font-bold text-center'>Detailed Syllabus of Every Depertment.</h1>
            
            <SyllabusHomeSlider />
        </div>
    );
};

export default SyllabusHome;