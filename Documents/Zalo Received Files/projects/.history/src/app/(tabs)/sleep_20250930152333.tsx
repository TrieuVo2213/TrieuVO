// app/(tabs)/sleep.tsx
import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  YStack, XStack, Text, Button, Card, Input, Separator,
} from 'tamagui';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PRIMARY = '#9B59FF';
const PRIMARY_PRESSED = '#8B4AE8';
const BG = '#F4F7FB';

type Mood = '😴' | '😐' | '😊';

export default function SleepLab() {
  const [tab, setTab] = useState<'journal' | 'support' | 'dreams'>('journal');

  // ----- Journal states -----
  const [bedTime, setBedTime] = useState('10:30 PM');
  const [wakeTime, setWakeTime] = useState('7:00 AM');
  const [quality, setQuality] = useState(4); // 1..5
  const [mood, setMood] = useState<Mood>('😊');
  const [factors, setFactors] = useState<Record<string, boolean>>({});
  const FACTORS = [
    'Uống coffee', 'Tập luyện', 'Stress',
    'Ăn muộn', 'Đọc sách', 'Xem phim',
    'Tắm nước ấm',
  ];

  // ----- Dreams states -----
  const [dreamText, setDreamText] = useState('');

  // Helpers
  const durationText = useMemo(() => {
    const mins = diffMinutes(bedTime, wakeTime);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  }, [bedTime, wakeTime]);

  const toggleFactor = (k: string) =>
    setFactors((p) => ({ ...p, [k]: !p[k] }));

  const onSaveJournal = () => {
    // TODO: lưu local/API
    console.log({
      bedTime, wakeTime, quality, mood,
      factors: Object.keys(factors).filter((k) => factors[k]),
    });
  };

  return (
    <YStack flex={1} backgroundColor={BG}>
      {/* Header */}
      <XStack alignItems="center" paddingHorizontal={16} paddingVertical={12}>
        <Button backgroundColor="transparent" height={36} width={36} onPress={() => {}}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Button>
        <Text fontSize={18} fontWeight="700" style={{ marginLeft: 8 }}>Sleep lab</Text>
        <XStack flex={1} />
        <Button backgroundColor="transparent" height={36} width={36}>
          <Ionicons name="moon-outline" size={20} color={PRIMARY} />
        </Button>
      </XStack>

      {/* Tabs */}
      <XStack paddingHorizontal={16} marginBottom={8} gap={8}>
        {[
          { key: 'journal', label: 'Nhật ký ngủ' },
          { key: 'support', label: 'Hỗ trợ ngủ' },
          { key: 'dreams', label: 'Giấc mơ' },
        ].map((t) => {
          const active = tab === (t.key as any);
          return (
            <Button
              key={t.key}
              flex={1}
              height={52}
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
        {/* ============= TAB 1: JOURNAL ============= */}
        {tab === 'journal' && (
          <YStack gap={16}>
            <Card
              padding={16}
              borderRadius={12}
              borderWidth={1}
              borderColor="#E8ECF3"
              backgroundColor="#FFFFFF"
            >
              <XStack alignItems="center" gap={8}>
                <Ionicons name="bed-outline" size={20} color={PRIMARY} />
                <Text fontSize={16} fontWeight="700">Thời gian ngủ hôm nay</Text>
              </XStack>

              {/* Bed / Wake rows */}
              <XStack marginTop={12} gap={12}>
                <YStack flex={1}>
                  <Text fontSize={13} color="#6B6B6B">Giờ đi ngủ</Text>
                  <XStack
                    alignItems="center"
                    height={52}
                    borderRadius={12}
                    borderWidth={1}
                    backgroundColor="#F8F8F8"
                    borderColor="#E4E4E4"
                    paddingHorizontal={12}
                    style={{ marginTop: 6 }}
                  >
                    <Ionicons name="time-outline" size={18} color="#6B6B6B" />
                    <Input
                      flex={1}
                      height={52}
                      fontSize={16}
                      placeholder="10:30 PM"
                      value={bedTime}
                      onChangeText={setBedTime}
                      backgroundColor="transparent"
                      style={{ marginLeft: 8 }}
                    />
                  </XStack>
                </YStack>

                <YStack flex={1}>
                  <Text fontSize={13} color="#6B6B6B">Giờ thức dậy</Text>
                  <XStack
                    alignItems="center"
                    height={52}
                    borderRadius={12}
                    borderWidth={1}
                    backgroundColor="#F8F8F8"
                    borderColor="#E4E4E4"
                    paddingHorizontal={12}
                    style={{ marginTop: 6 }}
                  >
                    <Ionicons name="alarm-outline" size={18} color="#6B6B6B" />
                    <Input
                      flex={1}
                      height={52}
                      fontSize={16}
                      placeholder="7:00 AM"
                      value={wakeTime}
                      onChangeText={setWakeTime}
                      backgroundColor="transparent"
                      style={{ marginLeft: 8 }}
                    />
                  </XStack>
                </YStack>
              </XStack>

              {/* Duration badge */}
              <YStack
                alignItems="center"
                justifyContent="center"
                height={44}
                borderRadius={10}
                backgroundColor="#F3E8FF"
                style={{ marginTop: 12 }}
              >
                <Text fontSize={15} fontWeight="700" color={PRIMARY}>{`Thời gian ngủ: ${durationText}`}</Text>
              </YStack>

              <Separator backgroundColor="#EEF1F6" style={{ marginVertical: 12 }} />

              {/* Rating */}
              <XStack alignItems="center" gap={8} style={{ marginTop: 12 }}>
                <Ionicons name="star-outline" size={20} color={PRIMARY} />
                <Text fontSize={13} color="#6B6B6B">Chất lượng giấc ngủ</Text>
              </XStack>
              <XStack alignItems="center" style={{ marginTop: 6 }}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const idx = i + 1;
                  const active = quality >= idx;
                  return (
                    <Button
                      key={idx}
                      backgroundColor="transparent"
                      height={36}
                      width={36}
                      onPress={() => setQuality(idx)}
                    >
                      <AntDesign name="star" size={20} color={active ? '#FFC107' : '#E0E0E0'} />
                    </Button>
                  );
                })}
              </XStack>

              {/* Mood */}
              <XStack alignItems="center" gap={8} style={{ marginTop: 12 }}>
                <Ionicons name="happy-outline" size={20} color={PRIMARY} />
                <Text fontSize={13} color="#6B6B6B">Tình trạng khi thức dậy</Text>
              </XStack>
              <XStack alignItems="center" flexWrap="wrap" style={{ marginTop: 6 }}>
                {(['😴', '😐', '😊','😫','😡','😭','🤩','😌','🤯'] as Mood[]).map((m) => (
                  <Button
                    key={m}
                    backgroundColor={mood === m ? '#FFF3CC' : '#FFFFFF'}
                    borderWidth={1}
                    borderColor="#E8ECF3"
                    height={40}
                    borderRadius={999}
                    paddingHorizontal={14}
                    onPress={() => setMood(m)}
                    style={{ marginRight: 8, marginBottom: 8 }}
                  >
                    <Text fontSize={18}>{m}</Text>
                  </Button>
                ))}
              </XStack>

              {/* Factors */}
              <XStack alignItems="center" gap={8} style={{ marginTop: 12 }}>
                <Ionicons name="list-outline" size={20} color={PRIMARY} />
                <Text fontSize={13} color="#6B6B6B">Yếu tố ảnh hưởng</Text>
              </XStack>
              <XStack flexWrap="wrap" style={{ marginTop: 6 }}>
                {FACTORS.map((f) => {
                  const active = !!factors[f];
                  return (
                    <Button
                      key={f}
                      backgroundColor={active ? '#EEF0FF' : '#FFFFFF'}
                      borderWidth={1}
                      borderColor={active ? PRIMARY : '#E8ECF3'}
                      height={36}
                      borderRadius={999}
                      paddingHorizontal={12}
                      onPress={() => toggleFactor(f)}
                      style={{ marginRight: 8, marginBottom: 8 }}
                    >
                      <Text fontSize={13} color={active ? PRIMARY : '#111111'} fontWeight="600">
                        {f}
                      </Text>
                    </Button>
                  );
                })}
              </XStack>

              {/* Save */}
              <Button
                height={52}
                borderRadius={12}
                backgroundColor={PRIMARY}
                pressStyle={{ backgroundColor: PRIMARY_PRESSED }}
                onPress={onSaveJournal}
                style={{ marginTop: 12 }}
              >
                <Text fontSize={16} fontWeight="700" color="#FFFFFF">Lưu nhật ký ngủ</Text>
              </Button>
            </Card>

            {/* Tip banner */}
            <Card
              backgroundColor="#F3E8FF"
              borderWidth={1}
              borderColor="#E3D7FE"
              borderRadius={12}
              paddingHorizontal={16}
              paddingVertical={14}
            >
              <XStack alignItems="center">
                <Ionicons name="bulb-outline" size={20} color={PRIMARY_PRESSED} />
                <YStack style={{ marginLeft: 10 }}>
                  <Text fontSize={14} fontWeight="700" color="#1F1F1F">Mẹo ngủ ngon</Text>
                  <Text fontSize={13} color="#6B6B6B">
                    Tránh màn hình điện tử 1 giờ trước khi ngủ. Ánh sáng xanh có thể ảnh hưởng đến melatonin.
                  </Text>
                </YStack>
              </XStack>
            </Card>
          </YStack>
        )}

        {/* ============= TAB 2: SUPPORT ============= */}
        {tab === 'support' && (
          <YStack gap={16}>
            {/* Breathing 4-7-8 */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap={8}>
                    <Ionicons name="leaf-outline" size={20} color={PRIMARY} />
                    <Text fontSize={16} fontWeight="700">Thở 4 - 7 - 8</Text>
                </XStack>
                <Text fontSize={13} color="#6B6B6B" style={{ marginTop: 4 }}>
                    Hít vào 4 giây · Nhịn thở 7 giây · Thở ra 8 giây
                </Text>
                <Button
                    style={{ marginTop: 12 }}
                    borderRadius={12}
                    height={48}
                    backgroundColor={PRIMARY}
                    pressStyle={{ backgroundColor: PRIMARY_PRESSED }}
                >
                    <Text fontSize={15} fontWeight="700" color="#FFFFFF">Bắt đầu luyện tập</Text>
                </Button>
            </Card>

            {/* Relaxing sounds */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFFFFF">
              <XStack alignItems="center" gap={8}>
                <Ionicons name="musical-notes-outline" size={20} color={PRIMARY} />
                <Text fontSize={16} fontWeight="700">Âm thanh thư giãn</Text>
              </XStack>
              <XStack flexWrap="wrap" gap={12} style={{ marginTop: 12 }}>
                {[
                  { icon: 'rainy-outline', label: 'Tiếng mưa' },
                  { icon: 'leaf-outline', label: 'Rừng đêm' },
                  { icon: 'flame-outline', label: 'Lò sưởi' },
                  { icon: 'cloudy-outline', label: 'Gió thổi' },
                ].map((item) => (
                  <Card
                    key={item.label}
                    width="45%"
                    padding={12}
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="#E8ECF3"
                  >
                    <Ionicons name={item.icon as any} size={22} color={PRIMARY} />
                    <Text fontSize={14} fontWeight="600" style={{ marginTop: 8 }}>{item.label}</Text>
                    <Text fontSize={12} color="#6B6B6B">60 phút</Text>
                  </Card>
                ))}
              </XStack>
            </Card>

            {/* Bedtime stories */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap={8}>
                    <Ionicons name="book-outline" size={20} color={PRIMARY} />
                    <Text fontSize={16} fontWeight="700">Kể chuyện ru ngủ</Text>
                </XStack>
                <YStack marginTop={12} gap={12}>
                    {[
                    { title: 'Hành trình trong rừng xanh', time: '15 phút' },
                    { title: 'Chuyến phiêu lưu biển cả', time: '20 phút' },
                    { title: 'Ngôi nhà trên mây', time: '30 phút' },
                    ].map((story) => (
                    <Card
                        key={story.title}
                        padding={12}
                        borderRadius={12}
                        borderWidth={1}
                        borderColor="#E8ECF3"
                        backgroundColor="#FAFAFA"
                    >
                        <XStack alignItems="center" justifyContent="space-between">
                        <YStack>
                            <Text fontSize={15} fontWeight="600">{story.title}</Text>
                            <Text fontSize={12} color="#6B6B6B">{story.time}</Text>
                        </YStack>
                        <Button backgroundColor="transparent" height={40} width={40}>
                            <Ionicons name="play-circle" size={24} color={PRIMARY} />
                        </Button>
                        </XStack>
                    </Card>
                    ))}
                </YStack>
            </Card>
          </YStack>
        )}

        {/* ============= TAB 3: DREAMS ============= */}
        {tab === 'dreams' && (
          <YStack gap={16}>
            {/* Write dream */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFFFFF">
              <XStack alignItems="center" gap={8}>
                <Ionicons name="cloud-outline" size={20} color={PRIMARY} />
                <Text fontSize={16} fontWeight="700">Nhật ký giấc mơ</Text>
              </XStack>
              <Input
                multiline
                minHeight={120}
                style={{ marginTop: 8 }}
                borderRadius={12}
                borderWidth={1}
                borderColor="#E4E4E4"
                backgroundColor="#F8F8F8"
                paddingHorizontal={12}
                paddingVertical={8}
                placeholder="Hãy mô tả giấc mơ của bạn..."
                value={dreamText}
                onChangeText={setDreamText}
              />
              <Button
                style={{ marginTop: 12 }}
                borderRadius={12}
                height={44}
                backgroundColor={PRIMARY}
                pressStyle={{ backgroundColor: PRIMARY_PRESSED }}
                onPress={() => {}}
              >
                <Text fontSize={15} fontWeight="700" color="#FFFFFF">Phân tích AI</Text>
              </Button>
            </Card>

            {/* History */}
            <Card padding={16} borderRadius={12} borderWidth={1} borderColor="#E8ECF3" backgroundColor="#FFFFFF">
            <XStack alignItems="center" gap={8}>
                <Ionicons name="time-outline" size={20} color={PRIMARY} />
                <Text fontSize={16} fontWeight="700">Lịch sử giấc mơ</Text>
            </XStack>

            <YStack style={{ marginTop: 12 }} gap={12}>
                {[
                {
                    date: '18/09/2025',
                    tags: [
                    { label: 'Phiêu lưu', bg: '#FAD7FF', color: '#8E3BE6' },
                    { label: 'Tích cực', bg: '#FFC7D6', color: '#D2386C' },
                    ],
                    content: 'Tôi mơ thấy lượn trên những đám mây trắng…',
                    insight: 'Giấc mơ thể hiện mong muốn tự do và khám phá. Cảm xúc tích cực cho thấy trạng thái tinh thần ổn định.',
                    edge: '#B57CFF',
                    grad: ['#B57CFF', '#F6C1FF'],
                },
                {
                    date: '19/09/2025',
                    tags: [
                    { label: 'Gia đình', bg: '#D7EEFF', color: '#2979FF' },
                    { label: 'Ấm áp', bg: '#CFF7E9', color: '#249F6B' },
                    ],
                    content: 'Gia đình tôi cùng nhau dự tiệc ngoài trời …',
                    insight: 'Giấc mơ về gia đình phản ánh nhu cầu kết nối và gắn bó. Môi trường ngoài trời cho thấy mong muốn tự do.',
                    edge: '#8CC0FF',
                    grad: ['#8CC0FF', '#D8E8FF'],
                },
                ].map((d, idx) => (
                <YStack key={idx}>
                    {/* Khung ngoài có viền màu theo theme giấc mơ */}
                    <YStack
                    backgroundColor="#FFFFFF"
                    borderRadius={16}
                    borderWidth={1}
                    borderColor="#E8ECF3"
                    elevation={2}
                    style={{
                        shadowColor: d.edge,
                        shadowOpacity: 0.15,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 8,
                    }}
                    >
                    {/* Dải gradient tiêu đề (ngày + tags) */}
                    <LinearGradient
                        colors={['#B57CFF', '#F6C1FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        }}
                    >
                        <XStack alignItems="center" gap={8} flexWrap="wrap">
                        <Text fontSize={13} fontWeight="800" color="#FFFFFF">
                            {d.date}
                        </Text>

                        {/* Chips */}
                        {d.tags.map((t) => (
                            <XStack
                            key={t.label}
                            alignItems="center"
                            paddingHorizontal={10}
                            paddingVertical={4}
                            borderRadius={999}
                            backgroundColor={t.bg}
                            >
                            <Text fontSize={12} fontWeight="700" color={t.color}>
                                {t.label}
                            </Text>
                            </XStack>
                        ))}
                        </XStack>
                    </LinearGradient>

                    {/* Thân nội dung */}
                    <YStack paddingHorizontal={12} paddingVertical={12} backgroundColor="#FFFFFF" borderBottomLeftRadius={16} borderBottomRightRadius={16}>
                        <Text fontSize={13} color="#1F1F1F">{d.content}</Text>

                        {/* Ô AI Insight */}
                        <YStack
                        backgroundColor="#FFFFFF"
                        borderRadius={12}
                        borderWidth={1}
                        borderColor="#EFEFF5"
                        paddingHorizontal={12}
                        paddingVertical={10}
                        style={{ marginTop: 10 }}
                        >
                        <XStack alignItems="center" gap={6} style={{ marginBottom: 4 }}>
                            <Ionicons name="sparkles-outline" size={16} color={PRIMARY} />
                            <Text fontSize={12} fontWeight="700" color="#111">AI Insight</Text>
                        </XStack>
                        <Text fontSize={12} color="#6B6B6B" lineHeight={18}>{d.insight}</Text>
                        </YStack>
                    </YStack>
                    </YStack>
                </YStack>
                ))}
            </YStack>
            </Card>


            {/* Stats */}
            <Card backgroundColor={PRIMARY} borderRadius={12} padding={16}>
              <XStack alignItems="center" gap={8}>
                <Ionicons name="analytics-outline" size={20} color="#FFFFFF" />
                <Text fontSize={15} fontWeight="600" color="#FFFFFF">Thống kê giấc mơ</Text>
              </XStack>
              <XStack style={{ marginTop: 8 }} gap={12}>
                <Card flex={1} borderRadius={12} padding={12} backgroundColor="#FFFFFF">
                  <Text fontSize={13} color="#6B6B6B">Chủ đề phổ biến</Text>
                  <Text fontSize={14} fontWeight="700">Phiêu lưu</Text>
                </Card>
                <Card flex={1} borderRadius={12} padding={12} backgroundColor="#FFFFFF">
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

/** Parse "HH:MM AM/PM" and get diff minutes from bed -> wake (wrap overnight) */
function diffMinutes(bed: string, wake: string) {
  const b = toMinutes(bed);
  const w = toMinutes(wake);
  const day = 24 * 60;
  const diff = (w - b + day) % day; // handle overnight
  return diff === 0 ? day : diff;   // treat same time as full day
}
function toMinutes(t: string) {
  // "10:30 PM" / "7:00 AM"
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return 0;
  let hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && hh !== 12) hh += 12;
  if (ap === 'AM' && hh === 12) hh = 0;
  return hh * 60 + mm;
}
