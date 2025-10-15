import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Button, Card, Input } from 'tamagui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PRIMARY = '#9B59FF';

export default function SleepLab() {
  const [tab, setTab] = useState<'journal' | 'support' | 'dreams'>('journal');
  const [dream, setDream] = useState('');

  return (
    <YStack flex={1} backgroundColor="#F4F7FB">
      {/* Header */}
      <XStack alignItems="center" paddingHorizontal={16} paddingVertical={12}>
        <Button backgroundColor="transparent" onPress={() => {}}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Button>
        <Text fontSize={18} fontWeight="700" style={{ marginLeft: 8 }}>Sleep lab</Text>
      </XStack>

      {/* Tabs */}
      <XStack paddingHorizontal={16} marginBottom={8} gap={8}>
        {[
          { key: 'journal', label: 'Nhật ký ngủ' },
          { key: 'support', label: 'Hỗ trợ ngủ' },
          { key: 'dreams', label: 'Giấc mơ' },
        ].map(t => {
          const active = tab === t.key;
          return (
            <Button
              key={t.key}
              flex={1}
              borderRadius={999}
              backgroundColor={active ? '#F3E8FF' : '#FFFFFF'}
              borderColor={active ? PRIMARY : '#E8ECF3'}
              borderWidth={1}
              onPress={() => setTab(t.key as any)}
            >
              <Text fontSize={14} color={active ? PRIMARY : '#6B6B6B'} fontWeight="600">
                {t.label}
              </Text>
            </Button>
          );
        })}
      </XStack>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {tab === 'journal' && (
          <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
            <Text fontSize={16} fontWeight="700">Thời gian ngủ hôm nay</Text>
            {/* ... giữ code màn nhật ký ngủ như bạn đã làm */}
          </Card>
        )}

        {tab === 'support' && (
          <YStack gap={16}>
            {/* Card kỹ thuật thở */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
              <Text fontSize={16} fontWeight="700">Thở 4 - 7 - 8</Text>
              <Text fontSize={13} color="#6B6B6B" marginTop={4}>
                Hít vào 4s - nhịn thở 7s - thở ra 8s
              </Text>
              <Button marginTop={12} borderRadius={12} height={48} backgroundColor={PRIMARY}>
                <Text fontSize={15} fontWeight="700" color="#FFF">Bắt đầu luyện tập</Text>
              </Button>
            </Card>

            {/* Card âm thanh */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
              <Text fontSize={16} fontWeight="700">Âm thanh thư giãn</Text>
              <XStack flexWrap="wrap" gap={12} marginTop={12}>
                {[
                  { icon: 'water', label: 'Tiếng mưa' },
                  { icon: 'waves', label: 'Sóng biển' },
                  { icon: 'tree', label: 'Rừng đêm' },
                  { icon: 'volume-high', label: 'White noise' },
                ].map(item => (
                  <Card
                    key={item.label}
                    width="45%"
                    padding={12}
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="#E8ECF3"
                  >
                    <Ionicons name={item.icon as any} size={22} color={PRIMARY} />
                    <Text fontSize={14} fontWeight="600" marginTop={8}>{item.label}</Text>
                    <Text fontSize={12} color="#6B6B6B">60 phút</Text>
                  </Card>
                ))}
              </XStack>
            </Card>

            {/* Card kể chuyện */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
              <Text fontSize={16} fontWeight="700">Kể chuyện ru ngủ</Text>
              {[
                { title: 'Hành trình trong rừng xanh', time: '15 phút' },
                { title: 'Chuyến phiêu lưu biển cả', time: '20 phút' },
                { title: 'Ngôi nhà trên mây', time: '30 phút' },
              ].map(story => (
                <XStack key={story.title} alignItems="center" justifyContent="space-between" marginTop={12}>
                  <YStack>
                    <Text fontSize={15} fontWeight="600">{story.title}</Text>
                    <Text fontSize={12} color="#6B6B6B">{story.time}</Text>
                  </YStack>
                  <Button backgroundColor="transparent" height={40} width={40}>
                    <Ionicons name="play-circle" size={24} color={PRIMARY} />
                  </Button>
                </XStack>
              ))}
            </Card>
          </YStack>
        )}

        {tab === 'dreams' && (
          <YStack gap={16}>
            {/* Form viết giấc mơ */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
              <Text fontSize={16} fontWeight="700">Nhật ký giấc mơ</Text>
              <Input
                multiline
                minHeight={100}
                marginTop={8}
                borderRadius={12}
                borderWidth={1}
                borderColor="#E4E4E4"
                backgroundColor="#F8F8F8"
                paddingHorizontal={12}
                paddingVertical={8}
                placeholder="Hãy mô tả giấc mơ của bạn..."
                value={dream}
                onChangeText={setDream}
              />
              <Button marginTop={12} borderRadius={12} height={44} backgroundColor={PRIMARY}>
                <Text fontSize={15} fontWeight="700" color="#FFF">Phân tích AI</Text>
              </Button>
            </Card>

            {/* Lịch sử giấc mơ */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFF">
              <Text fontSize={16} fontWeight="700">Lịch sử giấc mơ</Text>
              <YStack marginTop={12} gap={12}>
                <Card backgroundColor="#F3E8FF" borderRadius={12} padding={12}>
                  <Text fontSize={14} fontWeight="600" color={PRIMARY}>18/09/2025</Text>
                  <Text fontSize={13} marginTop={4}>Tôi mơ thấy mình bay lượn trên bầu trời.</Text>
                  <Text fontSize={12} marginTop={6} color="#6B6B6B">
                    AI Insight: Đây là giấc mơ thể hiện mong muốn tự do.
                  </Text>
                </Card>
                <Card backgroundColor="#E6F9F0" borderRadius={12} padding={12}>
                  <Text fontSize={14} fontWeight="600" color="#2F9E55">19/09/2025</Text>
                  <Text fontSize={13} marginTop={4}>Mơ thấy đi dạo trong rừng.</Text>
                  <Text fontSize={12} marginTop={6} color="#6B6B6B">
                    AI Insight: Liên quan đến trạng thái tìm kiếm sự cân bằng.
                  </Text>
                </Card>
              </YStack>
            </Card>

            {/* Thống kê */}
            <Card backgroundColor={PRIMARY} borderRadius={12} padding={16}>
              <Text fontSize={15} fontWeight="600" color="#FFF">Thống kê giấc mơ</Text>
              <XStack marginTop={8} gap={12}>
                <Card flex={1} borderRadius={12} padding={12} backgroundColor="#FFF">
                  <Text fontSize={13} color="#6B6B6B">Chủ đề phổ biến</Text>
                  <Text fontSize={14} fontWeight="700">Phiêu lưu</Text>
                </Card>
                <Card flex={1} borderRadius={12} padding={12} backgroundColor="#FFF">
                  <Text fontSize={13} color="#6B6B6B">Cảm xúc chính</Text>
                  <Text fontSize={14} fontWeight="700">Tích cực 75%</Text>
                </Card>
              </XStack>
            </Card>
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}
