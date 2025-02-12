"use client";

import {
  Button,
  Flex,
  Layout,
  Typography,
  Image,
  Statistic,
  Space,
  Row,
  Col,
  Spin,
} from "antd";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

export default function Home() {
  const [images, setImages] = useState<
    {
      url: string;
      id: string;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?page=${page}&limit=9`);
      const data = await response.json();
      setImages(images.concat(data.images));
      setHasMore(data.images.length > 0);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 250 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <Layout className="w-[calc(50%-8px)] min-h-screen mx-auto">
      <Header className="bg-transparent flex items-center border-b border-gray-200/80">
        <Flex justify="space-between" align="center" className="w-full">
          <Typography.Text italic strong className="text-2xl">
            Instagram
          </Typography.Text>
          <Flex gap={8}>
            <Button size="small" type="primary">
              Log in
            </Button>
            <Button size="small" type="link">
              Sign up
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Content className="flex-1 m-10">
        <Flex align="center" gap={40}>
          <Image
            width={120}
            height={120}
            className="rounded-full object-cover border-2 border-gray-200/50"
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Flex vertical>
            <Typography.Text className="text-lg">#housePlant</Typography.Text>
            <Space>
              <Statistic
                value={10690626}
                valueStyle={{ fontSize: "14px" }}
              ></Statistic>
              <Typography.Text type="secondary" className="text-base">
                posts
              </Typography.Text>
            </Space>
          </Flex>
        </Flex>
        <Flex vertical>
          <Typography.Text type="secondary" className="text-base">
            Top posts
          </Typography.Text>
          <Row gutter={[4, 0]}>
            {images.map((aImage) => (
              <Col key={aImage.id} span={8} >
                <Image
                  className="aspect-square object-cover"
                  placeholder={<Spin />}
                  preview={false}
                  src={aImage.url}
                  alt={`House plant image ${aImage.id}`}
                />
              </Col>
            ))}
          </Row>
        </Flex>
      </Content>
    </Layout>
  );
}
