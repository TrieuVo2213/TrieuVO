// app/(tabs)/ai-chat.tsx
import React, { useRef, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { YStack, XStack, Card, Text, Input, Button } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const PRIMARY = '#9B59FF';

type Msg = { id: string; role: 'user' | 'ai'; text: string };

export default function SleepAIChat() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'w1', role: 'ai', text: 'Xin chào 👋 Mình là AI của FlowState. Bạn muốn thư giãn hay cần mẹo ngủ nhanh hôm nay?' },
  ]);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { id: String(Date.now()), role: 'user', text: t };
    setMsgs((m) => [...m, userMsg]);
    setText('');
    // mock trả lời
    setTimeout(() => {
      const reply: Msg = {
        id: String(Date.now() + 1),
        role: 'ai',
        text: suggest(t),
      };
      setMsgs((m) => [...m, reply]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 600);
  };

  return (
    <YStack flex={1} backgroundColor="#F4F7FB">
      {/* Header */}
      <XStack alignItems="center" paddingHorizontal={16} paddingVertical={12}>
        <Button backgroundColor="transparent" height={36} width={36} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Button>
        <Text fontSize={18} fontWeight="700" style={{ marginLeft: 8 }}>Trò chuyện cùng AI</Text>
      </XStack>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 16, paddingBottom: 20 }}>
          {msgs.map((m) => (
            <XStack key={m.id} justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'} marginBottom={10}>
              <Card
                backgroundColor={m.role === 'user' ? '#E9F0FF' : '#FFFFFF'}
                borderRadius={14}
                paddingHorizontal={12}
                paddingVertical={10}
                borderWidth={1}
                borderColor="#E6E9F2"
                maxWidth="85%"
              >
                <Text fontSize={14} color="#1F1F1F">{m.text}</Text>
              </Card>
            </XStack>
          ))}
        </ScrollView>

        {/* Input */}
        <XStack padding={12} gap={8} backgroundColor="#FFFFFF" borderTopWidth={1} borderColor="#EEF1F5">
          <Input
            flex={1}
            height={44}
            borderRadius={12}
            borderWidth={1}
            borderColor="#E4E4E4"
            backgroundColor="#F8F8F8"
            paddingHorizontal={12}
            placeholder="Nhập tin nhắn… (ví dụ: kể chuyện ru ngủ)"
            value={text}
            onChangeText={setText}
          />
          <Button height={44} borderRadius={12} backgroundColor={PRIMARY} onPress={send}>
            <Ionicons name="send" size={18} color="#fff" />
          </Button>
        </XStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}

// Trả lời giả lập rất ngắn gọn theo intent
function suggest(q: string) {
  const s = q.toLowerCase();
  if (s.includes('kể') || s.includes('chuyện'))
    return 'Một câu chuyện ngắn: “Ngôi nhà trên mây”. Hãy nhắm mắt, hít thở chậm 4s… bạn đang bước lên bậc thang mây mềm…';
  if (s.includes('thiền') || s.includes('thư giãn'))
    return 'Thiền dẫn: Hít vào 4s, giữ 4s, thở ra 6s. Thả lỏng vai, hàm, mắt. Hình dung làn sóng ấm áp lan từ đầu đến chân.';
  if (s.includes('mẹo') || s.includes('khó ngủ'))
    return 'Mẹo nhanh: tắt màn hình 45–60 phút trước giờ ngủ, phòng mát ~20–22°C, ánh sáng ấm, tránh cà phê sau 14h.';
  if (s.includes('đếm cừu') || s.includes('sleep'))
    return 'Thử đếm 4–7–8: hít 4, giữ 7, thở 8 — lặp lại 4 lần. Kèm hình dung phong cảnh yên bình sẽ giúp thư giãn nhanh hơn.';
  return 'Mình có thể kể chuyện, hướng dẫn thiền ngắn, hoặc đưa mẹo ngủ. Bạn muốn thử kiểu nào?';
}
