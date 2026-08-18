---
title: "How to do Example Mapping"
description: "A few months ago i came across Matt Wynne’s post about Example Mapping on the cucumber blog. During XP2016 I attended Matt’s Example Mapping workshop. I’ve been using the technique with teams for a few months now. This post will share what Example Mapping is and some of the experiences i’ve had using it.What is Example Mapping?Here is the process taken from the Cucumber blog:Example Mapping uses a pack of 4-coloured index cards and some pens to capture these different types of information as the"
slug: "how-to-do-example-mapping"
url: "https://www.tobysinclair.com/post/how-to-do-example-mapping"
type: post
published: "2016-05-25T15:24:44.000Z"
modified: "2016-05-25T15:24:44.000Z"
image: "https://static.wixstatic.com/media/67d4e8_0b4b90d155ea4cc7961828e51b352e65~mv2.jpg"
readingTime: "4 min read"
categories:
  - agile
---

A few months ago i came across [Matt Wynne’s](http://blog.mattwynne.net/) post about [Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction) on the cucumber blog. During [XP2016](http://www.xp2016.org/)  I attended Matt’s Example Mapping workshop. I’ve been using the technique with teams for a few months now. This post will share what Example Mapping is and some of the experiences i’ve had using it.

![FullSizeRender](https://static.wixstatic.com/media/67d4e8_0b4b90d155ea4cc7961828e51b352e65~mv2.jpg)

## What is Example Mapping?

Here is the process taken from the [Cucumber blog](https://cucumber.io/blog/2015/12/08/example-mapping-introduction):

> Example Mapping uses a [pack of 4-coloured index cards](http://www.staples.com/Staples-Assorted-Color-Index-Cards/product_SS1037669) and some pens to capture these different types of information as the conversation unfolds. As we talk, we capture them on index cards, and arrange them in a map:
> We start by writing the **story** under discussion on a **yellow** card and placing it at the top of the table.
> Next we write each of the acceptance criteria, or **rules** that we already know, on a **blue** card and placing those across the table beneath the yellow story card.
> For each rule, we may need one or more **examples** to illustrate it. We write those on a **green** card and place them under the relevant rule.
> As we discuss these examples, we may uncover **questions** that nobody in the room can answer. We capture those on a **red**card and move on with the conversation.
> We keep going until the group is satisfied that the scope of the story is clear, or we run out of time.
> And that’s it. I told you it was simple!

## How I’ve used it?

Teams I work with follow a simple principle called “Three Amigos”

![three-amigos-main](https://static.wixstatic.com/media/67d4e8_f007bbc50e7c4e30afc9519f389559a8~mv2.jpg)

We apply this to our story conversations ensuring that in each conversation we have:

1. Someone who knows the problem domain (Usually a Product Owner)
2. Someone who can technically implement (Usually a Developer)
3. Someone who can critique the product/solution and think laterally (Usually a Tester)

Usually that results in 3 people but it could be more. We want enough people to have a good conversation.

Our Three Amigo conversations happen in two ways:

1. Formal – A scheduled session run three times a week. In the calendar at a set time. Voluntary session where the team self-organise and decide who should attend. These sessions last maximum of 30mins.
2. Informal – Conversations at someone’s desk where a small group gather to discuss a particular feature/story.

It is during these Three Amigo Comversations  that we use Example Mapping.

## Benefits I’ve seen with Example Mapping

![](https://static.wixstatic.com/media/67d4e8_03e2218ef23545abb068dc6c0322a964~mv2.jpg)

**Benefit [#1](https://www.tobysinclair.com/blog/hashtags/1) – Getting past the first Question**

Often during Three Amigo conversations i’ve found that teams struggle to get past the first question. When a difficult question arises the team get stuck on that one question. To overcome this we use the [Diverge/Merge/Converge](http://sloanreview.mit.edu/article/diverge-before-you-converge-tips-for-creative-brainstorming/) technique with Example Mapping. This allows us to get all our current understanding on the table first. We structure the conversation as follows:

1. **0 – 5 Minutes** – PO/BA presents the story and potentially a handful of rules. Just enough information to start a conversation.
2. **5 – 10 Minutes –** Individual Brainstorming of Rules(Acceptance Criteria), Questions and Examples.
3. **10 – 30 Minutes** –  Discuss

**Benefit [#2](https://www.tobysinclair.com/blog/hashtags/2) – Colour Heuristics**

As the different elements are colour coded it is very easy to use this as a heuristic for the readiness of the story. For example:

1. Lots of Blue (Rules) story is too big
2. Lots of Green (Examples) might mean our rules are not specific
3. Lots of Red (Questions) might mean we don’t have clarity or there are too many unknowns

**Benefit [#3](https://www.tobysinclair.com/blog/hashtags/3) – Knowledge Capture**

Often in less structured Three Amigo sessions you can have really good conversations but there is a risk that the knowledge is not captured. In this process you have those great questions and examples captured.

**Benefit [#4](https://www.tobysinclair.com/blog/hashtags/4) – Rules not Specifications**

I’ve often seen teams write their acceptance criteria as designs or technical specifications. Example Mapping reinforces Acceptance Criteria as Rules. This leads to better examples and ultimately better stories. I’ve seen this be a particular challenge for some teams. If the Acceptance Criteria is written as Specifications its much harder to find good examples which aren’t tied to the technical implementation. Ultimately this process helps you get much better Acceptance Criteria.

Benefit [#5](https://www.tobysinclair.com/blog/hashtags/5) – It’s fast!

Prior to implementing Example Mapping for our Three Amigo conversations our sessions used to be an Hour long. We have now reduced the sessions to 30minutes but run them more frequently. The team finds short, frequent sessions better than longer less frequent discussions.

Benefit [#6](https://www.tobysinclair.com/blog/hashtags/6) – It supports remote teams

We have run the example mapping session digitally. Sometimes we have team members who are out of the office so we use a virtual post it note board.

Benefit [#7](https://www.tobysinclair.com/blog/hashtags/7) – Example format

Sometimes people get lost in the syntax of Examples. Given/When/Then can force people into a certain thought process. This approach allows people to declare their examples in a simple way.

## Share and Visualise

It is also important to socialise your conversations. As Three Amigos is a subset of the team it’s important to share any key findings with the rest of the group. A good way to do this is to post your example Mapping sessions on the wall next to the Scrum Board. This way the team can keep track of the conversations. If you have a remote time simply sharing the link to the virtual whiteboard is a good way.

## What happens next?

Typically we want to make the decision – Is this story ready? The main driver we’ve found is Questions. Do we have outstanding questions that mean we cannot proceed. It’s fine to have  some questions open if you are confident they won’t impact your ability to proceed in the Sprint. To aid this process a simple [Roman vote](http://www.conferencesthatwork.com/index.php/event-design/2012/06/testing-consensus-using-roman-voting/) can help the group decide if the story is ready.

For more about Example Mapping head to the Cucumber blog [here](https://cucumber.io/blog/2015/12/08/example-mapping-introduction)
