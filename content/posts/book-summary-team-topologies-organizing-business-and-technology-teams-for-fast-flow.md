---
title: "Book Summary: Team Topologies | Organizing Business and Technology Teams for Fast Flow"
description: "The 3 big ideas, key quotes and takeaways from Team Topologies by Matthew Skelton and Manuel Pais. Learn how team structures shape software architecture and flow."
slug: "book-summary-team-topologies-organizing-business-and-technology-teams-for-fast-flow"
url: "https://www.tobysinclair.com/post/book-summary-team-topologies-organizing-business-and-technology-teams-for-fast-flow"
type: post
published: "2021-04-16T00:00:00.000Z"
image: "https://static.wixstatic.com/media/67d4e8_3b53639e1c134486934f5798efbcf887~mv2.jpg"
readingTime: "8 min read"
categories:
  - book-summaries
  - organisational-design
---

⭐ Toby's Rating: 8/10 - Recommended For: Technology Managers

## 3 Big Ideas

1. Use the Inverse Conway manoeuvre: an organisation focuses on organising team structures to match the architecture they want the system to exhibit, rather than expecting teams to follow a mandated architecture design.
2. Minimise extraneous team cognitive load so that teams can focus on the work that really matters.
3. The four team topologies, interaction modes and effective software boundaries will help improve the flow of value.

## 2 Most Tweetable Quotes

> You can think of Team Topologies like elements needed for creating and maintaining a garden. The team topologies approach acts like the instructions for placing the flowers and plants, along with patterns for pruning and training, whereas the cultural engineering and financial elements are like the soil, water and fertiliser that helps the plants grow healthily.

> If the architecture of the system and the architecture of the organisation are at odds, the architecture of the organisation wins. — Ruth Malan

## Toby's Top Takeaway

I really liked how Team Topologies clearly described Conway's Law with practical examples. A key principle within the book is to reduce communication as much as possible between teams. This may sound counterintuitive as "collaboration" is widely espoused within agile.

However, as the book explains, high collaboration within the team is good but it's ideal to have minimal collaboration outside your team. When high collaboration is needed across teams this increases cognitive load and time to deliver.

Therefore what's really crucial is knowing when teams should collaborate instead of using another form of interaction such as "X-as-a-service".

Fast flow requires restricting communication between teams. Team collaboration is important for grey areas of development, where discovery and expertise are needed to make progress, but in areas where execution prevails not discovery, communication becomes an unnecessary overhead.

A caution for readers: the book is practical so it would be tempting to jump straight into solutions. These team topologies are designed for organisations attempting to optimise flow.

Overall, the approach advocates for organisation design that optimises for the flow of change and feedback from running systems.

The hard truth is that might not be your organisation’s goal, or at the very least there are significant organisational dynamics that undermine flow. For example, if your organisation is fixated with efficiency or “keeping people busy”, implementation of these topologies is unlikely to be successful.

A final thought: I would love to hear the authors' thoughts on strategy deployment and backlog alignment to the topologies. For example, how does the backlog interaction work between the different teams? Especially how is the complicated subsystem team backlog managed?

## Big Ideas from Team Topologies by Matthew Skelton and Manuel Pais

Team Topologies focuses on how to set up dynamic team structures and interaction modes that can help teams adapt quickly to new conditions and achieve fast and safe software delivery.

The combination of well-defined teams and well-defined interaction modes provides a powerful and flexible organisational capability for structural adaptation to change.

Behavioural studies suggest that humans work best with others when we can predict their behaviour.

Three organisational structures in every organisation:

- The formal structure — facilitates compliance
- Informal structure — the realm of influence between individuals
- Value creation structure — how work actually gets done based on interpersonal relationships and reputation

Five rules of thumb for designing organisations:

1. Design when there is a compelling reason
2. Develop options for deciding on a design
3. Choose the right time to design
4. Look for clues that things are out of alignment
5. Stay alert to the future

Given our skills constraints, cultural and engineering maturity, desired software architecture and business goals, which team topology will help us deliver results faster and safer?

### Conway’s Law and Architecture

Inverse Conway manoeuvre: an organisation focuses on organising team structures to match the architecture they want the system to exhibit, rather than expecting teams to follow a mandated architecture design.

Conway's Law tells us that we need to understand what software architecture is needed before we organise our teams. Otherwise, the communication paths and incentives in the organisation will end up dictating the software architecture.

Software architecture (and organisation design) good practices:

- Loose coupling
- High cohesion
- Clear and appropriate version compatibility
- Clear and appropriate cross-team testing

The three different categories of dependency:

- Knowledge
- Task
- Resource dependencies

### Thoughts on Platforms

A digital platform is a foundation of self-service APIs, tools, services, knowledge and support which are arranged as a compelling internal product. Autonomous delivery teams can make use of the platform to deliver product features at a higher pace with reduced coordination.

Technology is only ever a part of the platform. Roadmaps, guided evolution, documentation, concern for developer experience and appropriate encapsulation of underlying complexity are all key parts of an effective delivery platform for stream-aligned teams.

### Fracture Planes — Defining Software (Organisational) Boundaries

A fracture plane is a natural seam in the software (organisation) system that allows the system to be split easily into two or more parts:

- Business domain bounded context
- Regulatory compliance
- Change cadence
- Team location
- Risk / performance isolation
- Technology
- User personas

Fracture plane litmus test: does the resulting architecture support more autonomous teams with reduced cognitive load?

When considering subsystem boundaries, the main aim should be to find software fracture planes that align to business domain bounded contexts, because most of these bounded contexts will map to streams of change that are natural for the organisation.

### Triggers for the Evolution of Team Topologies

- The software has grown too large for one team
- Delivery cadence is becoming slower
- Multiple business services rely on a large set of underlying services

Team topologies also need:

- a healthy organisational culture
- good engineering practices
- healthy funding and financial practices
- clarity of business vision

### How to Get Started

Start with the team. What does the team need in order to:

- act and operate effectively as a team?
- own part of the software effectively?
- focus on meeting the needs of users?
- reduce unnecessary cognitive load?
- consume and provide software and information to other teams?

Then:

1. Identify suitable streams of change
2. Identify the thinnest viable platform
3. Identify capability gaps in team coaching, mentoring, service management and documentation
4. Share and practice different interaction modes and explain principles behind new ways of working

You might also like: [Ultimate List of Organizational Design Resources](/post/ultimate-list-of-organizational-design-resources)
