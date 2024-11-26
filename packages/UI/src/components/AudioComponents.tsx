import * as React from "@theia/core/shared/react";
import ChapterReading from "./ChapterReading";

// import { Badge } from "./ui/Badge";

// const sources = [
//   { value: "audio", label: "Audio" },
//   { value: "video", label: "Video" },
// ];
// const speeds = [
//   { value: "2x", label: "2x" },
//   { value: "4x", label: "4x" },
// ];

function AudioComponents() {
  return (
    <ChapterReading
      version="NLT"
      chapterName="Mark"
      verse="1"
      scripture="John the Baptist Prepares the Way
1 This is the Good News about Jesus the Messiah, the Son of God. It began 2
just as the prophet Isaiah had written:
&quot;Look, I am sending my messenger ahead of you,
and he will prepare your way.
3 He is a voice shouting in the wilderness,
'Prepare the way for the Lord's coming!
Clear the road for him!&quot;
4 This messenger was John the Baptist. He was in the wilderness and
preached that people should be baptized to show that they had repented of
their sins and turned to God to be forgiven. 5 All of Judea, including all the
people of Jerusalem, went out to see and hear John. And when they
confessed their sins, he baptized them in the Jordan River."
    />
  );
}

export default AudioComponents;
