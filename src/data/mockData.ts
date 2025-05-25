
import { Problem, Comment } from "@/types";

// Generate mock problems
export const mockProblems: Problem[] = [
  {
    id: "p1",
    userId: "user1",
    userNickname: "BraveTiger",
    title: "Struggling with workplace harassment",
    description: "I've been facing inappropriate comments at my workplace for weeks. I'm not sure how to address this without risking my job. Has anyone dealt with something similar?",
    tags: ["workplace", "harassment", "career"],
    location: {
      latitude: 27.7172,
      longitude: 85.324,
      name: "Kathmandu"
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 3,
    status: "active" as const
  },
  {
    id: "p2",
    userId: "user2",
    userNickname: "GentleDolphin",
    title: "Anxiety about college entrance exams",
    description: "I'm preparing for my entrance exams and feel overwhelmed. The pressure from my family is making it worse. How do you manage study stress?",
    tags: ["education", "mental health", "stress"],
    location: {
      latitude: 27.6588,
      longitude: 85.3247,
      name: "Patan"
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 5,
    status: "active" as const
  },
  {
    id: "p3",
    userId: "user3",
    userNickname: "WiseElephant",
    title: "Safety concerns in my neighborhood",
    description: "Recently there have been incidents in my area that make me feel unsafe walking home. Are there any community safety groups or tips for staying safe?",
    tags: ["safety", "community"],
    location: {
      latitude: 27.6710,
      longitude: 85.4298,
      name: "Bhaktapur"
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 2,
    status: "active" as const
  },
  {
    id: "p4",
    userId: "user4",
    userNickname: "SwiftEagle",
    title: "Need career guidance for women in tech",
    description: "I'm interested in pursuing a career in technology but don't have many female role models or mentors. Any advice for a woman starting in this field?",
    tags: ["career", "technology", "women"],
    location: {
      latitude: 27.6735,
      longitude: 85.4390,
      name: "Thimi"
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 4,
    status: "active" as const
  }
];

// Generate mock comments
export const mockComments: Record<string, Comment[]> = {
  "p1": [
    {
      id: "c1",
      problemId: "p1",
      userId: "user5",
      userNickname: "KindButterfly",
      content: "Document every incident with dates and details. Consider speaking with HR if you have one, or seek advice from a legal aid organization that specializes in workplace issues.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      upvotes: 7
    },
    {
      id: "c2",
      problemId: "p1",
      userId: "user6",
      userNickname: "BoldWolf",
      content: "I experienced something similar. Finding allies at work helped me feel supported. Also, there are NGOs that offer free counseling for workplace harassment.",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      upvotes: 4
    },
    {
      id: "c3",
      problemId: "p1",
      userId: "user7",
      userNickname: "HopefulDove",
      content: "Some organizations have anonymous reporting systems. Check if your workplace has one. If not, would your supervisor be understanding if you brought this up confidentially?",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      upvotes: 3
    }
  ],
  "p2": [
    {
      id: "c4",
      problemId: "p2",
      userId: "user8",
      userNickname: "CalmPanda",
      content: "Try breaking your study schedule into manageable chunks with short breaks. The Pomodoro technique worked well for me during exam preparation.",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      upvotes: 8
    },
    {
      id: "c5",
      problemId: "p2",
      userId: "user9",
      userNickname: "BrightLion",
      content: "Family pressure can be tough. Maybe explain to them that constant pressure is affecting your performance. Sometimes setting boundaries is necessary.",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      upvotes: 6
    }
  ],
  "p3": [
    {
      id: "c6",
      problemId: "p3",
      userId: "user10",
      userNickname: "StrongDeer",
      content: "See if there's a community safety group in your area. Walking with someone else when possible is also good. Some areas have volunteer escort services too.",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      upvotes: 5
    }
  ],
  "p4": []
};
