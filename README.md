# 르카이브 Frontend Project

### 사용 library 및 framework 선택
- next.js: 정적인 페이지가 주이기에 react 보다 nextjs를 사용
- zod, react-hook-form: form 유효성검사를 편하고 쉽게 사용하기위해 사용
- RTK: redux-tookit로 redux 보일러플레이트를 줄인며 더 쉽게 사용하기위해 사용
- fetch: api 비동기는 nextjs 에서 기본으로 지원하는 fetch 사용

#### Code Convention
- prettier 설정
- eslint 간단한 설정
- type 사용할때 component의 props만 interface 나머지는 유동적으로 type or interface 사용
- 화살표 함수 사용

#### 네이밍 원칙
- 약어쓰지 않고 최대한 풀어서 작성
- 검색 가능한 이름 사용
- 폴더명은 소문자

#### 네이밍 방법
- camelCase -> 변수명, 함수명
- 핸들러는 handle~~~ 로작성

#### 주석
- 필요시 함수 위에 무슨 함수인지 설명적는 jsdoc 작성


#### Git Convention
#### 1. Work Process

1. [이슈에 앞으로 할 작업을 작성](https://github.com/yejin-kingdom/value-together/issues/150)한다.
2. 브랜치를 파서 작업을 진행한다.
   1. Work Process
   2. [이슈에 앞으로 할 작업을 작성](https://github.com/yejin-kingdom/value-together/issues/150)한다.
   3. 브랜치를 파서 작업을 진행한다.
3. 작업 완료 시 풀리퀘에 관한 이슈를 함께 등록한다. 
4. 머지 시 이슈 닫기.
   1. PR에서 close #{이슈번호} 입력 시 머지하면 자동으로 이슈 닫힘 

##### 2. Branch
- Github flow
    - main 브랜치는 유지
    - 새로운 작업에 브랜치를 분기 후 작업
    - 작업 완료 시 PR로 리뷰 후 머지
    - 전부 `소문자`로 작성
    - ex) 기능 추가 시, `feat/add-login-이슈번호`
- `main`: 라이브 서버에 제품으로 출시되는 브랜치.
    - (주의) 절대 바로 main 브랜치에 push 하지 마세요. 반드시 팀원들과 협의 후 pull request를 통해 main 브랜치로 merge합니다.
- `dev`: 다음 출시 버전을 대비하여 개발하는 브랜치.
    - feature 브랜치에서 팀원과 협의후 완성된 기능인 경우 pull request를 통해 develop 브랜치로 merge
- `feat`: 기능 개발 브랜치로 기능 완성 시 develop 브랜치로 pull request로 merge 합니다.
- `fix`: feature 또는 develop 단계의 브랜치에서 발생한 버그를 수정하는 브랜치
- `release`: 다음 버전 출시를 준비하는 브랜치
- `hotfix`: master 브랜치에서 발생한 버그를 수정하는 브랜치입니다.
- `refactor`: 리팩토링을 진행할 때 사용하는 브랜치입니다.
- 위 브랜치 중 항시 유지되는 브랜치는 master, develop 브랜치이며 merge 되면 사라지는(삭제하는) 보조 브랜치는 feature, release, hotifx, fix, refactor 5가지로 구성됩니다.

#### 3. Commit
## 

- issue 번호
- 전부 `소문자`로 작성
- `feat: 기능 추가` ← 콜론 후 스페이스 바
- Domain은 행위 뒤에 `feat(User): 로그인 구현` (대문자)
- `1커밋` 당 `1행위`
- `1PR` 당 `1단위`
- 만약 커밋 헤더에 다 담지 못하는 경우 바디에 상세 설명 (도메인 포함)
- 커밋 헤더 맨 앞에는 `[#{담당 이슈번호}]` 작성하기
    - ex) `[#151] feat: 로그인 구현`

```
[#issue] commit-tag(Domain): commit message
[#2] feat(User): 유저 로그인
```
|작업타입|작업내용|
|---|---|
|feat|해당 파일에 새로운 기능이 생김|
|fix|	코드 수정|
|HOTFIX|	급하게 치명적인 버그를 고쳐야하는 경우|
|refactor|	코드 리팩토링|
|move|	파일 옮김/정리|
|remove|	기능/파일을 삭제|
|docs|	문서작업|
|test|	테스트 코드를 작성|
|style|	css|
|script|	package.json 변경(npm 설치 등)|
|chore|	빌드 업무 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음|


#### 4. Issue Template
- 이슈 내부에서 체크박스로 관리

```mdxjs
## 작업사항 (이슈번호)
- [ ] responseCode 생성
- [ ] responseCode 각 DomainResponseCode에 implements
- [ ] DomainResponseCode에서 overriding
- [ ] #11
```

#### 5. Pull Request Template
- 다음 브랜치로 이동할 경우 반드시 pull request를 통해 이동한다.
- 절대로 main 브랜치로 바로 merge 및 push 하지 않는다.

```mdxjs
## 개요
response 관련 변경점

## 작업사항
- [ ] responseCode 생성
- [ ] responseCode 각 DomainResponseCode에 implements
- [ ] DomainResponseCode에서 overriding

## 관련 이슈
- [ ] close #16
```
#### 6. Review
- **P1: 꼭 반영해주세요 (Request changes)**

리뷰어는 PR의 내용이 서비스에 중대한 오류를 발생할 수 있는 가능성을 잠재하고 있는 등 중대한 코드 수정이 반드시 필요하다고 판단되는 경우, P1 태그를 통해 리뷰 요청자에게 수정을 요청합니다. 리뷰 요청자는 p1 태그에 대해 리뷰어의 요청을 반영하거나, 반영할 수 없는 합리적인 의견을 통해 리뷰어를 설득할 수 있어야 합니다.

- **P2: 적극적으로 고려해주세요 (Request changes)**

작성자는 P2에 대해 수용하거나 만약 수용할 수 없는 상황이라면 적합한 의견을 들어 토론할 것을 권장합니다.

- **P3: 웬만하면 반영해 주세요 (Comment)**

작성자는 P3에 대해 수용하거나 만약 수용할 수 없는 상황이라면 반영할 수 없는 이유를 들어 설명하거나 다음에 반영할 계획을 명시적으로(JIRA 티켓 등으로) 표현할 것을 권장합니다. Request changes 가 아닌 Comment 와 함께 사용됩니다.

- **P4: 반영해도 좋고 넘어가도 좋습니다 (Approve)**

작성자는 P4에 대해서는 아무런 의견을 달지 않고 무시해도 괜찮습니다. 해당 의견을 반영하는 게 좋을지 고민해 보는 정도면 충분합니다.

- **P5: 그냥 사소한 의견입니다 (Approve)**

작성자는 P5에 대해 아무런 의견을 달지 않고 무시해도 괜찮습니다.