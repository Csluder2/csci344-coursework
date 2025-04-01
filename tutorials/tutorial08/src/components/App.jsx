import React, {useState} from "react";
import NavBar from "./NavBar";
import {Image} from 'antd';
import {Card, Space } from 'antd';
import { Carousel } from 'antd';
import {Button, Drawer } from 'antd';
// custom components:

export default function App() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    return (
        <>
            <NavBar />

            <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
                <p>Put your design system components in the space below...</p>
                <Space direction="vertical" size={16}>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
  <Carousel autoplay>
        <div>
            <img src="https://picsum.photos/600/600?id=1" alt="Slide 1" />
        </div>
        <div>
            <img src="https://picsum.photos/600/600?id=2" alt="Slide 2" />
        </div>
        <div>
            <img src="https://picsum.photos/600/600?id=3" alt="Slide 3" />
        </div>
        <div>
            <img src="https://picsum.photos/600/600?id=4" alt="Slide 4" />
        </div>
    </Carousel>
    <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    
                <h2 className="font-Comfortaa my-4 font-bold text-xl">
     Photo Gallery
 </h2>
 <div className="flex flex-wrap content-start">
     <Image
         src="https://picsum.photos/600/600?id=1"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=2"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=3"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=4"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=5"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=6"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=7"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=8"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=9"
         width={200}
     />
     <Image
         src="https://picsum.photos/600/600?id=10"
         width={200}
     />
 </div>
            </main>

            <footer className="p-5 bg-white">footer goes here</footer>
        </>
    );
}
