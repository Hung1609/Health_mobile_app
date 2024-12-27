from pymongo import MongoClient

# connect to MongoDB Atlas
client = MongoClient("mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/?retryWrites=true&w=majority&appName=Exercise")

# Choose database and collection
db = client["Health_database"]
collection = db["exercises"]

# Set name to unique
collection.create_index("name", unique=True)

# Data
data = [
    {
        "name": "Plank",
        "description": "Đây là động tác giúp giảm số cân nặng hiệu quả, đặc biệt là phần mỡ thừa ở vòng eo và bụng dưới. Ngoài ra, Plank cũng hỗ trợ tăng cường sức lực cho hai bên cánh tay, làm sắc chắc vùng ngực.",
        "steps": [
            "Di chuyển bằng cả hai tay và hai chân. Đặt phần cổ tay dưới vai, đầu gối dưới hông. Nâng đầu gối lên cao. Chú ý duỗi thẳng chân để đưa toàn bộ cơ thể ở trạng thái mở rộng hoàn toàn.",
            "Uốn cong phần cánh tay sao cho khuỷu tay chạm đất. Dồn trọng lượng cơ thể lên phần ngón chân và cẳng tay.",
            "Kéo dài và giữ thẳng cột sống, vận động phần cơ tay, chân và bụng.",
            "Duỗi thẳng gáy, hướng mắt xuống sàn.",
            "Cố gắng giữ tư thế trong vòng 1 phút rồi thả lỏng."
        ],
        "benefits": [
            "Giảm mỡ thừa ở vòng eo và bụng dưới",
            "Tăng cường sức lực cho hai bên cánh tay",
            "Làm săn chắc vùng ngực"
        ]
    },
    {
        "name": "Hít đất",
        "description": "Hít đất là một bài tập giảm cân vô cùng hiệu quả đặc biệt dành cho phái mạnh. Bạn có thể lựa chọn tập động tác này ngay trong nhà mà không cần dụng cụ.",
        "steps": [
            "Chống cả tay và chân xuống sàn nhà. Duỗi thẳng cả hai tay, dang rộng ra hai bên.",
            "Nhẹ nhàng hạ thân người cho đến khi phần ngực gần chạm sàn nhà thì dừng lại. Sau đó, nâng người trở về vị trí ban đầu."
        ],
        "benefits": [
            "Rèn luyện sức bền của toàn bộ cơ thể",
            "Nâng cao cơ ngực, cơ tay"
        ]
    }
]

# Insert data into the collection
for exercise in data:
    try:
        collection.insert_one(exercise)
    except Exception as e:
        print(f"Lỗi khi chèn dữ liệu: {exercise['name']}, {e}")
print("Dữ liệu đã được lưu thành công!")

# New data
new_data = [
  {
    "name": "Mountain Climbers",
    "description": "Mountain Climbers là bài thể dục giảm cân nhanh giúp đốt mỡ bụng vô cùng hiệu quả. Do đó, nếu bạn nào có nhu cầu muốn giảm phần mỡ thừa “lì lợm” ở quanh vùng bụng thì đây là gợi ý phù hợp.",
    "steps": [
      "Để cơ thể vào tư thế plank cao. Đặt hai tay dưới vai, các ngón chân co vào trong. Luôn giữ lưng nằm trên một đường thẳng.",
      "Gập đầu gối, đồng thời, di chuyển phần ngực về phía trước. Tạm dừng 1 giây rồi trở về vị trí như ban đầu.",
      "Lặp lại tương tự với chân còn lại."
    ],
    "benefits": [
      "Giảm mỡ thừa ở vùng bụng",
      "Cải thiện sự linh hoạt và sức bền"
    ]
  },
  {
    "name": "Leo cầu thang",
    "description": "Leo cầu thang tưởng chừng như là một hoạt động thông thường hằng ngày nhưng trên thực tế, đây cũng là động tác thể dục giúp giảm cân hiệu quả. Khi leo cầu thang, bạn buộc phải sử dụng sức ở cơ mông, cơ đùi và bắp chân để nâng toàn bộ cơ thể lên.",
    "steps": [],
    "benefits": [
      "Loại bỏ mỡ thừa",
      "Giúp giảm cân nhanh chóng"
    ]
  },
  {
    "name": "Squat",
    "description": "Squat mông là bài tập thể dục giảm cân nhanh được nhiều người ưa chuộng. Bởi không những giúp đốt năng lượng hiệu quả, Squat còn giúp vòng ba nảy nở, cơ đùi trở nên săn chắc.",
    "steps": [
      "Dang rộng hai chân bằng vai.",
      "Nhẹ nhàng hạ người xuống sao cho phần đùi vuông góc với bắp chân. Chú ý giữ lưng thẳng khi thực hiện động tác này.",
      "Sau khi giữ động tác khoảng 2 - 3 giây thì trở về vị trí ban đầu. Lặp lại như vậy khoảng 30 - 40 lần/ngày."
    ],
    "benefits": [
      "Giảm mỡ thừa ở bụng",
      "Tăng cường cơ đùi và vòng ba"
    ]
  },
  {
    "name": "Gập bụng",
    "description": "Gập bụng là bài tập tác động mạnh vào cơ bụng và eo, giúp giảm mỡ thừa và làm săn chắc vùng bụng.",
    "steps": [
      "Nằm ở tư thế ngửa trên sàn nhà.",
      "Nhẹ nhàng đặt hai tay ra phía sau gáy và dùng lực ở bụng để nâng cao đầu lên khỏi mặt sàn.",
      "Tiếp tục dùng sức để co hai chân lên và ép người xuống. Hít thở nhẹ nhàng và chậm rãi.",
      "Giữ nguyên động tác trong 3 giây, hít sâu rồi quay lại vị trí ban đầu."
    ],
    "benefits": [
      "Giảm mỡ bụng",
      "Làm săn chắc cơ bụng và eo"
    ]
  },
  {
    "name": "Đi bộ",
    "description": "Đi bộ là một bài tập thể dục giảm cân ngoài trời giúp giảm stress và hỗ trợ giảm cân nếu thực hiện đều đặn.",
    "steps": [],
    "benefits": [
      "Giảm cân nhẹ nhàng",
      "Giảm stress và căng thẳng"
    ]
  },
  {
    "name": "Bơi lội",
    "description": "Bơi lội là bài tập thể dục giảm cân giúp rèn luyện sức khỏe tim mạch hiệu quả, đồng thời giúp đốt cháy nhiều calo.",
    "steps": [],
    "benefits": [
      "Rèn luyện sức khỏe tim mạch",
      "Giúp đốt cháy calo và giảm mỡ"
    ]
  },
  {
    "name": "Chạy bộ",
    "description": "Chạy bộ là một bài tập thể dục giảm cân nhanh chóng, dễ thực hiện giúp đốt cháy nhiều calo và săn chắc cơ thể.",
    "steps": [],
    "benefits": [
      "Giảm cân nhanh chóng",
      "Săn chắc cơ đùi và cơ mông"
    ]
  },
  {
    "name": "Đạp xe",
    "description": "Đạp xe là bài tập thể dục giảm cân ngoài trời giúp đốt cháy calo và nâng cao sức bền cho toàn bộ cơ thể.",
    "steps": [
      "Đạp khởi động nhẹ trong 10 phút.",
      "Dùng hết sức đạp nhanh trong 30 giây tiếp theo.",
      "Đạp vận tốc chậm trong 60 giây tiếp theo.",
      "Lặp lại quy trình 30 giây - 60 giây khoảng 4 lần. Sau đó đạp vận tốc chậm trong 4 phút."
    ],
    "benefits": [
      "Đốt cháy calo hiệu quả",
      "Nâng cao sức bền và săn chắc cơ thể"
    ]
  }
]


# Insert new data (ignore duplicates)
for exercise in new_data:
    try:
        collection.insert_one(exercise)
    except Exception as e:
        print(f"Lỗi khi chèn dữ liệu: {exercise['name']}, {e}")

print("Dữ liệu mới đã được thêm thành công!")